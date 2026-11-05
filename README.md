# gameWisp (GameHub)

O'yinlar platformasi — React + Vite + TypeScript + Tailwind + shadcn/ui, backend: Supabase.

## Lokal ishga tushirish

```sh
npm install
npm run dev      # http://localhost:8080
```

## Build

```sh
npm run build    # natija: dist/
```

## Muhit o'zgaruvchilari (`.env`)

```
VITE_SUPABASE_PROJECT_ID=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Backend (Supabase)

- `supabase/migrations/` — ma'lumotlar bazasi jadvallari
- `supabase/functions/ai-chat/` — AI chat (Google Gemini). Supabase secret: `GEMINI_API_KEY`

## Deploy

Vercel: https://gamehub-ai-main.vercel.app (`vercel.json` SPA yo'naltirishni sozlaydi).
