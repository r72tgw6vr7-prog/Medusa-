#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

STRICT="${STRICT:-0}"
STAGED_ONLY="${STAGED_ONLY:-0}"

FILES=()
if [[ "$STAGED_ONLY" == "1" ]] && command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  while IFS= read -r f; do
    [[ -n "$f" ]] || continue
    FILES+=("$f")
  done < <(git diff --cached --name-only --diff-filter=ACMR | grep '^src/' || true)
fi

in_scope() {
  local path="$1"
  if [[ "$STAGED_ONLY" == "1" ]]; then
    local f
    for f in "${FILES[@]:-}"; do
      if [[ "$f" == "$path" ]]; then
        return 0
      fi
    done
    return 1
  fi
  return 0
}

fail() {
  echo "FAIL: $*" >&2
  return 1
}

warn() {
  echo "WARN: $*" >&2
}

section() {
  echo ""
  echo "== $* =="
}

EXIT_CODE=0

section "Folder depth (max 4 levels under src/)"
DEPTH_VIOLATIONS=()
while IFS= read -r dir; do
  if [[ "$dir" == "src" ]]; then
    continue
  fi

  rel="${dir#src/}"
  if [[ "$rel" == "$dir" ]]; then
    continue
  fi

  IFS='/' read -r -a parts <<< "$rel"
  if (( ${#parts[@]} > 4 )); then
    DEPTH_VIOLATIONS+=("$dir")
  fi
done < <(find src -type d -print)

if (( ${#DEPTH_VIOLATIONS[@]} > 0 )); then
  echo "Directories deeper than 4 levels under src/:"
  printf '%s\n' "${DEPTH_VIOLATIONS[@]}"
  EXIT_CODE=1
else
  echo "OK"
fi

section "Naming: PascalCase components (.tsx)"
COMPONENT_NAME_VIOLATIONS=()
if [[ -d "src/components" ]]; then
  while IFS= read -r file; do
    if ! in_scope "$file"; then
      continue
    fi

    base="$(basename "$file")"

    # Ignore test files and type-only files
    if [[ "$base" == *.test.tsx || "$base" == *.spec.tsx || "$base" == *.d.ts ]]; then
      continue
    fi

    # Allow: Foo.tsx, FooBar.tsx, Foo.example.tsx, FooBar.stories.tsx
    if ! [[ "$base" =~ ^[A-Z][A-Za-z0-9]*(\.(example|stories|story))?\.tsx$ ]]; then
      COMPONENT_NAME_VIOLATIONS+=("$file")
    fi
  done < <(find src/components -type f -name "*.tsx" -print)
fi

if (( ${#COMPONENT_NAME_VIOLATIONS[@]} > 0 )); then
  echo "Component .tsx files not matching PascalCase convention:"
  printf '%s\n' "${COMPONENT_NAME_VIOLATIONS[@]}"
  EXIT_CODE=1
else
  echo "OK"
fi

section "Naming: kebab-case utils (.ts)"
UTIL_NAME_VIOLATIONS=()
if [[ -d "src/utils" ]]; then
  while IFS= read -r file; do
    if ! in_scope "$file"; then
      continue
    fi

    base="$(basename "$file")"

    # Allow index.ts
    if [[ "$base" == "index.ts" ]]; then
      continue
    fi

    if ! [[ "$base" =~ ^[a-z0-9]+(-[a-z0-9]+)*\.ts$ ]]; then
      UTIL_NAME_VIOLATIONS+=("$file")
    fi
  done < <(find src/utils -type f -name "*.ts" -print)
fi

if (( ${#UTIL_NAME_VIOLATIONS[@]} > 0 )); then
  echo "Utils files not matching kebab-case convention:"
  printf '%s\n' "${UTIL_NAME_VIOLATIONS[@]}"
  EXIT_CODE=1
else
  echo "OK"
fi

section "Barrel exports: no empty/non-exporting index.ts"
BARREL_VIOLATIONS=()
while IFS= read -r idx; do
  if ! grep -q "export" "$idx"; then
    BARREL_VIOLATIONS+=("$idx")
  fi
done < <(find src -type f -name "index.ts" -print)

if (( ${#BARREL_VIOLATIONS[@]} > 0 )); then
  echo "index.ts files without exports:"
  printf '%s\n' "${BARREL_VIOLATIONS[@]}"
  EXIT_CODE=1
else
  echo "OK"
fi

section "Circular dependencies (madge)"
if ! command -v npx >/dev/null 2>&1; then
  fail "npx not found; cannot run madge checks"
  EXIT_CODE=1
else
  if ! npx --yes madge --extensions ts,tsx --ts-config tsconfig.json --circular src; then
    EXIT_CODE=1
  fi
fi

section "Orphan report (madge --orphans)"
# By default, this is a REPORT (warn) because valid entrypoints can appear as orphans.
# Set STRICT=1 to fail the check.
if command -v npx >/dev/null 2>&1; then
  ORPHANS_RAW="$(npx --yes madge --extensions ts,tsx --ts-config tsconfig.json --orphans src || true)"

  # Remove tool header lines and obvious non-action lines
  ORPHANS_FILTERED="$(echo "$ORPHANS_RAW" \
    | grep -vE '^(Processed|\s*$)' \
    | grep -vE '(^✔|^%$)' \
    | grep -vE '__tests__/' \
    | grep -vE '\\.(test|spec)\\.' \
    | grep -vE 'vite-env\\.d\\.ts$' \
    | grep -vE '^main\\.tsx$' \
    | grep -vE '^routes\\.tsx$' \
    | grep -vE '^app/.*/page\\.tsx$' \
    || true)"

  if [[ -n "$ORPHANS_FILTERED" ]]; then
    echo "$ORPHANS_FILTERED"
    if [[ "$STRICT" == "1" ]]; then
      EXIT_CODE=1
    else
      warn "Orphans detected (report-only). Re-run with STRICT=1 to fail commits/CI."
    fi
  else
    echo "OK"
  fi
else
  warn "npx not found; skipping orphan report"
fi

section "Stale TODO/FIXME/HACK/XXX markers"
if [[ "$STAGED_ONLY" == "1" ]]; then
  TODO_HITS=""
  for f in "${FILES[@]:-}"; do
    if [[ "$f" == *.ts || "$f" == *.tsx ]]; then
      TODO_HITS+="$(grep -n "TODO\\|FIXME\\|HACK\\|XXX" "$f" || true)"$'\n'
    fi
  done
  TODO_HITS="$(echo "$TODO_HITS" | sed '/^\s*$/d' || true)"
else
  TODO_HITS="$(grep -R "TODO\\|FIXME\\|HACK\\|XXX" src --include="*.ts" --include="*.tsx" || true)"
fi
if [[ -n "$TODO_HITS" ]]; then
  echo "$TODO_HITS"
  if [[ "$STRICT" == "1" ]]; then
    EXIT_CODE=1
  else
    warn "TODO markers present (report-only)."
  fi
else
  echo "OK"
fi

section "Large files (>300 LOC)"
if [[ "$STAGED_ONLY" == "1" ]]; then
  LARGE_FILES=""
  for f in "${FILES[@]:-}"; do
    if [[ "$f" == *.ts || "$f" == *.tsx ]]; then
      lines="$(wc -l < "$f" | tr -d ' ')"
      if [[ "$lines" =~ ^[0-9]+$ ]] && (( lines > 300 )); then
        LARGE_FILES+="$lines $f"$'\n'
      fi
    fi
  done
  LARGE_FILES="$(echo "$LARGE_FILES" | sed '/^\s*$/d' | sort -nr || true)"
else
  LARGE_FILES="$(find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec wc -l {} + | awk '$1>300 {print $1" " $2}' | sort -nr || true)"
fi
if [[ -n "$LARGE_FILES" ]]; then
  echo "$LARGE_FILES"
  if [[ "$STRICT" == "1" ]]; then
    EXIT_CODE=1
  else
    warn "Large files detected (report-only)."
  fi
else
  echo "OK"
fi

section "Duplicate index.ts along a branch (report)"
# Interpretation: on any path, there should not be both `a/index.ts` and `a/b/index.ts`.
# This repo currently uses nested barrels; this check is report-only unless STRICT=1.
INDEX_VIOLATIONS=()
while IFS= read -r idx; do
  parent_dir="$(dirname "$idx")"
  ancestor="$parent_dir"
  while [[ "$ancestor" != "src" && "$ancestor" != "." && "$ancestor" != "/" ]]; do
    ancestor="$(dirname "$ancestor")"
    if [[ "$ancestor" == "src" ]]; then
      break
    fi
    if [[ -f "$ancestor/index.ts" ]]; then
      INDEX_VIOLATIONS+=("$idx (ancestor: $ancestor/index.ts)")
      break
    fi
  done
done < <(find src -type f -name "index.ts" -print)

if (( ${#INDEX_VIOLATIONS[@]} > 0 )); then
  printf '%s\n' "${INDEX_VIOLATIONS[@]}"
  if [[ "$STRICT" == "1" ]]; then
    EXIT_CODE=1
  else
    warn "Duplicate index.ts along branch detected (report-only)."
  fi
else
  echo "OK"
fi

section "Top-level src/* README.md presence (report)"
README_VIOLATIONS=()
while IFS= read -r dir; do
  base="$(basename "$dir")"
  if [[ "$base" == "__tests__" ]]; then
    continue
  fi
  if [[ ! -f "$dir/README.md" ]]; then
    README_VIOLATIONS+=("$dir/README.md")
  fi
done < <(find src -mindepth 1 -maxdepth 1 -type d -print)

if (( ${#README_VIOLATIONS[@]} > 0 )); then
  echo "Missing README.md (expected at):"
  printf '%s\n' "${README_VIOLATIONS[@]}"
  if [[ "$STRICT" == "1" ]]; then
    EXIT_CODE=1
  else
    warn "Missing folder README.md files (report-only)."
  fi
else
  echo "OK"
fi

echo ""
if [[ "$EXIT_CODE" -ne 0 ]]; then
  echo "Hygiene checks: FAILED" >&2
else
  echo "Hygiene checks: PASSED"
fi

exit "$EXIT_CODE"
