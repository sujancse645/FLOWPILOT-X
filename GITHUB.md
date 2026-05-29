# Push FlowPilot X to GitHub

## Option A — GitHub website (no CLI)

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `flowpilot-x` (or your choice)
3. **Do not** add README, .gitignore, or license (already in this project)
4. Create repository
5. Run in PowerShell from `c:\Flowzint`:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/flowpilot-x.git
git branch -M main
git push -u origin main
```

## Option B — GitHub CLI

```powershell
winget install GitHub.cli
gh auth login
cd c:\Flowzint
gh repo create flowpilot-x --public --source=. --remote=origin --push
```

## After push

- **Vercel:** Import repo, set root directory to `frontend`
- **Railway/Render:** Deploy `backend` folder
- Add secrets in hosting dashboards (see `frontend/.env.example`)
