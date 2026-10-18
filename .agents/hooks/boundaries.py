#!/usr/bin/env python3
"""Stack-neutral layer boundary checker.

Reads [layout] and [boundaries] from .agents/kit.toml and checks import lines:

  * Layer direction (automatic): domain must not reference application,
    infrastructure or api; application must not reference infrastructure or
    api; api must not reference infrastructure.
  * Forbidden libraries (configured): regexes in [boundaries]
    domain_forbidden / application_forbidden / api_forbidden.

This is a line-level heuristic that works for most languages (JS/TS, Python, Go,
Java/Kotlin, C#, Rust, PHP). Stack packs should add a real dependency checker
(dependency-cruiser, go-arch-lint, import-linter, ArchUnit) for full precision.

Usage:
  boundaries.py --layer domain|application|api|all   scan whole layer directories
  boundaries.py --file PATH [PATH ...]              scan specific files
Exit code: 0 clean, 1 violations found, 2 configuration error.
"""
import argparse
import os
import re
import sys

KIT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DEFAULT_EXTENSIONS = {".ts", ".tsx", ".js", ".mjs", ".cjs", ".go", ".py", ".java",
                      ".kt", ".kts", ".scala", ".cs", ".rs", ".php", ".rb"}

LAYERS = ("domain", "application", "infrastructure", "api")
# layer -> layers it must never reference
DIRECTION = {
    "domain": ("application", "infrastructure", "api"),
    "application": ("infrastructure", "api"),
    "api": ("infrastructure",),
    "infrastructure": ("api",),
}

IMPORT_PATTERNS = [
    re.compile(r"^\s*import\b"),                         # TS/JS, Java, Kotlin, Go single, Python
    re.compile(r"^\s*from\s+\S+\s+import\b"),            # Python
    re.compile(r"^\s*export\b.*\bfrom\s+['\"]"),         # TS/JS re-export
    re.compile(r"\brequire(_once|_relative)?\s*\(?\s*['\"]"),  # JS, PHP, Ruby
    re.compile(r"\bimport\s*\(\s*['\"]"),                # dynamic import
    re.compile(r"^\s*using\s+[\w.]+\s*;"),               # C#
    re.compile(r"^\s*(pub\s+)?use\s+[\w:\\]+"),          # Rust, PHP
]
GO_BLOCK_START = re.compile(r"^\s*import\s*\(\s*$")
GO_BLOCK_LINE = re.compile(r"^\s*([\w.]+\s+)?\"[^\"]+\"")


# ---------------------------------------------------------------- config ---
def _parse_toml(path):
    try:
        import tomllib  # Python 3.11+
        with open(path, "rb") as f:
            return tomllib.load(f)
    except ModuleNotFoundError:
        pass
    # Minimal fallback: [section], key = "str", key = ["a", "b"] (one line)
    data, section = {}, None
    with open(path, encoding="utf-8") as f:
        for raw in f:
            # drop a trailing comment that sits outside any quoted string
            line = re.sub(r'(^(?:[^"#]|"[^"]*")*)#.*$', r"\1", raw).strip()
            if not line:
                continue
            m = re.match(r"^\[([\w.-]+)\]$", line)
            if m:
                section = data.setdefault(m.group(1), {})
                continue
            m = re.match(r'^([\w-]+)\s*=\s*(.+)$', line)
            if m and section is not None:
                key, val = m.group(1), m.group(2).strip()
                if val.startswith("["):
                    section[key] = re.findall(r'"([^"]*)"', val)
                else:
                    section[key] = val.strip('"')
    return data


def load_config(root=KIT_ROOT):
    path = os.path.join(root, ".agents", "kit.toml")
    cfg = _parse_toml(path) if os.path.exists(path) else {}
    layout = cfg.get("layout", {})
    bounds = cfg.get("boundaries", {})
    exts = layout.get("source_extensions") or []
    return {
        "root": root,
        "source_root": layout.get("source_root", "src").rstrip("/"),
        "layers": {l: (layout.get(l) or "").rstrip("/") for l in LAYERS},
        "composition_root": [p.rstrip("/") for p in _as_list(layout.get("composition_root"))],
        "extensions": set(exts) if exts else DEFAULT_EXTENSIONS,
        "forbidden": {
            "domain": _as_list(bounds.get("domain_forbidden")),
            "application": _as_list(bounds.get("application_forbidden")),
            "api": _as_list(bounds.get("api_forbidden")),
            "infrastructure": [],
        },
    }


def _as_list(v):
    if not v:
        return []
    return [v] if isinstance(v, str) else list(v)


# ---------------------------------------------------------------- scanning ---
def layer_of(rel_path, cfg):
    rel = rel_path.replace(os.sep, "/")
    for cr in cfg["composition_root"]:
        if cr and (rel == cr or rel.startswith(cr + "/")):
            return None  # the composition root may reference every layer
    best = None
    for layer, path in cfg["layers"].items():
        if path and (rel == path or rel.startswith(path + "/")):
            if best is None or len(path) > len(cfg["layers"][best]):
                best = layer
    return best


def _segment_regex(layer_path):
    seg = re.escape(layer_path.rsplit("/", 1)[-1])
    return re.compile(r"(?<![\w-])" + seg + r"(?![\w-])")


def import_lines(lines):
    in_go_block = False
    for idx, line in enumerate(lines, 1):
        if in_go_block:
            if line.strip().startswith(")"):
                in_go_block = False
            elif GO_BLOCK_LINE.match(line):
                yield idx, line
            continue
        if GO_BLOCK_START.match(line):
            in_go_block = True
            continue
        if any(p.search(line) for p in IMPORT_PATTERNS):
            yield idx, line


def scan_file(file_path, cfg):
    root = cfg["root"]
    rel = os.path.relpath(os.path.abspath(file_path), root).replace(os.sep, "/")
    if os.path.splitext(rel)[1] not in cfg["extensions"] or not os.path.isfile(file_path):
        return []
    layer = layer_of(rel, cfg)
    if layer is None:
        return []
    banned_layers = [(l, _segment_regex(cfg["layers"][l])) for l in DIRECTION[layer] if cfg["layers"][l]]
    banned_libs = [(p, re.compile(p)) for p in cfg["forbidden"].get(layer, [])]
    with open(file_path, encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
    findings = []
    for idx, line in import_lines(lines):
        for target, rx in banned_layers:
            if rx.search(line):
                findings.append({"file": rel, "line": idx, "risk": "HIGH",
                                 "rule": f"{layer} layer references {target} layer",
                                 "code": line.strip()})
        for pattern, rx in banned_libs:
            if rx.search(line):
                findings.append({"file": rel, "line": idx, "risk": "HIGH",
                                 "rule": f"{layer} layer imports forbidden library ({pattern})",
                                 "code": line.strip()})
    return findings


def files_in(directory, cfg):
    for dp, dns, fns in os.walk(directory):
        dns[:] = [d for d in dns if d not in {"node_modules", "vendor", ".git", "dist", "build", "__pycache__"}]
        for fn in fns:
            if os.path.splitext(fn)[1] in cfg["extensions"]:
                yield os.path.join(dp, fn)


# ---------------------------------------------------------------- CLI ---
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--layer", choices=LAYERS + ("all",))
    g.add_argument("--file", nargs="+")
    args = ap.parse_args()

    cfg = load_config()
    targets = []
    if args.file:
        targets = args.file
    else:
        layers = LAYERS if args.layer == "all" else (args.layer,)
        for l in layers:
            d = cfg["layers"][l]
            if not d:
                print(f"    [layout] {l} is not set in .agents/kit.toml, skipping.")
                continue
            full = os.path.join(cfg["root"], d)
            if not os.path.isdir(full):
                print(f"    {d}/ not found, skipping {l} layer.")
                continue
            targets.extend(files_in(full, cfg))

    findings = [f for t in targets for f in scan_file(t, cfg)]
    if findings:
        print(f"❌ {len(findings)} boundary violation(s):")
        for f in findings:
            print(f"  {f['file']}:{f['line']}  {f['rule']}\n      {f['code']}")
        return 1
    print("✅ Layer boundaries clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
