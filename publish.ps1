# Publish this folder as a GitHub repository (Windows).
#
#   .\publish.ps1 -Slug "<owner>/<repo>" [-Private]
#
# Uses the GitHub CLI when available; otherwise pushes to a repository you
# already created in the browser. No token is ever stored by this script.
param(
  [Parameter(Mandatory = $true)][string]$Slug,
  [switch]$Private
)

$ErrorActionPreference = "Stop"
$visibility = if ($Private) { "--private" } else { "--public" }

if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
  git init -b main
  git add -A
  git commit -m "feat: Cyberpunk 2077 theme for DeepSeek Harness"
}

$ghReady = $false
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth status *> $null
  if ($LASTEXITCODE -eq 0) { $ghReady = $true }
}

if ($ghReady) {
  gh repo create $Slug $visibility --source=. --remote=origin --push
} else {
  Write-Host "GitHub CLI not ready; create the empty repository in the browser first."
  git remote remove origin 2>$null
  git remote add origin "https://github.com/$Slug.git"
  git push -u origin main
}

Write-Host "done: https://github.com/$Slug"
