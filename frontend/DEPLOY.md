# Deploy FlowPilot X to Vercel

## One-time setup

```bash
npm i -g vercel
vercel login
```

## Deploy

```bash
cd frontend
vercel --prod
```

## Environment variables (Vercel Dashboard → Project → Settings)

| Variable | Value |
|----------|--------|
| `BACKEND_URL` | Your Railway/Render API URL |
| `NEXT_PUBLIC_SOCKET_URL` | Same API URL (WebSockets) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional — omit for dev-mode dashboard |
| `CLERK_SECRET_KEY` | Optional |

Without a backend, the UI still runs; live data requires `backend` on port 4000 or a hosted API.

## Git deploy (recommended)

1. Push repo to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Set **Root Directory** to `frontend`
4. Deploy
