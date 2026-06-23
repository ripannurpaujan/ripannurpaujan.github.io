#!/usr/bin/env python3
"""
commit_portfolio.py
────────────────────────────────────────────────────────────────
Cara pakai:
  python commit_portfolio.py

Script ini akan detect file yang berubah via git status,
lalu commit & push ke GitHub.
────────────────────────────────────────────────────────────────
"""

import subprocess, sys
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).parent.resolve()

def run(cmd, check=True):
    r = subprocess.run(cmd, cwd=REPO_ROOT, capture_output=True, text=True)
    if check and r.returncode != 0:
        print(f"  ✗ Error: {r.stderr.strip()}")
        sys.exit(1)
    return r.stdout.strip()

def get_changed_files():
    """Ambil semua file yang berubah (modified, untracked, staged)."""
    output = run(["git", "status", "--short"], check=False)
    if not output:
        return []
    files = []
    for line in output.splitlines():
        # Format: "XY filename" — ambil filename (kolom 3 dst)
        parts = line.strip().split(None, 1)
        if len(parts) == 2:
            files.append(parts[1].strip())
    return files

def main():
    print("\n📦  Portfolio Git Commit & Push")
    print("=" * 45)

    # Detect changed files
    changed = get_changed_files()

    if not changed:
        print("\n  ✓ Tidak ada perubahan — sudah up to date.")
        return

    print("\n  📄 File yang berubah:")
    for f in changed:
        print(f"     • {f}")

    # Tanya commit message
    print()
    desc = input("  📝 Keterangan perubahan: ").strip()
    if not desc:
        desc = "update portfolio"

    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    commit_msg = f"fix: {desc} [{now}]"

    # Git add semua yang berubah
    print("\n  ➕ Git add...")
    run(["git", "add"] + changed)

    # Git commit
    print(f"  💾 Commit: {commit_msg}")
    run(["git", "commit", "-m", commit_msg])

    # Git push
    print("  🚀 Pushing ke GitHub...")
    run(["git", "push"])

    print(f"\n✅  Done! Web update dalam ~30 detik.\n")

if __name__ == "__main__":
    main()