#!/usr/bin/env bash
# Publish this folder as a GitHub repository.
#
#   ./publish.sh <owner>/<repo> [--private]
#
# Requires either the GitHub CLI (`gh auth login`) or a git credential helper
# that already knows your GitHub token. Never paste a token into a shell
# history on a shared machine - use `gh auth login` instead.
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: ./publish.sh <owner>/<repo> [--private]" >&2
  exit 1
fi

SLUG="$1"
VISIBILITY="public"
if [ "${2:-}" = "--private" ]; then VISIBILITY="private"; fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init -b main
  git add -A
  git commit -m "feat: Cyberpunk 2077 theme for DeepSeek Harness"
fi

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "using GitHub CLI"
  gh repo create "$SLUG" --"$VISIBILITY" --source=. --remote=origin --push
else
  echo "GitHub CLI not ready; falling back to plain git."
  echo "Create the empty repository in the browser first, then this pushes to it."
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$SLUG.git"
  git push -u origin main
fi

echo "done: https://github.com/$SLUG"
