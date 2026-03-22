## Astro Shipra – Client Website

### Setup
- **Install**: `npm install`
- **Run**: `npm run dev`

### Environment variables
Create a `.env` file (Vite):

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_KEY=...        # or VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```

Vercel serverless functions (set in Vercel project env):

```bash
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

### Supabase table
Run `supabase/consultations.sql` in the Supabase SQL editor (creates `consultations` with RLS).

### Routes
- `/` landing page (theme based on `n.html`)
- `/signup` email + OTP signup (then redirects to `/dashboard/book`)
- `/login` password or OTP login
- `/dashboard/*` authenticated area with collapsible left sidebar:
  - `/dashboard/book`
  - `/dashboard/history`
  - `/dashboard/settings`

