#!/usr/bin/env bash
set -euo pipefail

branch_name="$(git rev-parse --abbrev-ref HEAD)"

if [[ "${branch_name}" != "main" ]]; then
  printf 'Refusing production deploy from branch "%s". Switch to "main" before running deploy:production.\n' "${branch_name}" >&2
  exit 1
fi
