# pokemon-card-app

## apps/frontend の実行

```zsh
pnpm run dev:frontend
```

## apps/buckend の実行

```zsh
pnpm run dev:backend
```

## ブランチのお掃除

```zsh
git branch --merged | grep -vE '(main|develop|master)' | xargs -I {} git branch -d {} && git branch -r --merged origin/main | grep -vE 'origin/(main|develop|master)' | sed 's/origin\///' | xargs -I {} git push origin --delete {}
```
