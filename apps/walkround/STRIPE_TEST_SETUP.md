# WalkRound website — Stripe TEST checkout setup

This site is static (GitHub Pages). Stripe **secret** keys never live here.
Checkout sessions are created by Supabase Edge Functions in the WalkRound app repo.

## Public pages

| Path | Purpose |
|------|---------|
| [/apps/walkround/pricing/](https://mindmirageapps.com/apps/walkround/pricing/) | Driver quantity + Start WalkRound |
| [/apps/walkround/subscription-success/](https://mindmirageapps.com/apps/walkround/subscription-success/) | After Stripe Checkout |
| [/apps/walkround/signup/](https://mindmirageapps.com/apps/walkround/signup/) | Create company account |

## Configure Supabase secrets (TEST only)

From the WalkRound app repo (with Supabase CLI linked to project `riayvatfbviyozlrwzvp`):

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SIGNING_SECRET

supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook

# Apply the subscriptions table
supabase db push
# or: supabase migration up
```

Also apply migration:

`supabase/migrations/20260916180000_walkround_subscriptions.sql`

## Stripe Dashboard (TEST mode)

1. Ensure you are in **Test mode**.
2. Product `prod_VGsgMjZe76N8hA` / Price `price_1UGKvaE66oN9fw8MieahBGGr` (monthly volume).
3. Developers → Webhooks → Add endpoint:
   - URL: `https://riayvatfbviyozlrwzvp.supabase.co/functions/v1/stripe-webhook`
   - Events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.paid`
     - `invoice.payment_failed`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

## Sandbox test flow

1. Open https://mindmirageapps.com/apps/walkround/pricing/
2. Set driver count (e.g. 37 → display shows £283.50 / month).
3. Click **Start WalkRound**.
4. Complete Checkout with test card `4242 4242 4242 4242`, any future expiry, any CVC.
5. Land on subscription-success, then create a company on `/apps/walkround/signup`.
6. In Stripe TEST Dashboard, confirm the subscription quantity matches the driver count.
7. In Supabase, confirm a row appears in `walkround_subscriptions` after the webhook fires.

## Security checklist

- No `sk_live_`, `sk_test_`, or `whsec_` values in this website repo or frontend JS.
- Frontend only calls the public Edge Function URL with the publishable/anon key.
- Browser redirect is not treated as proof of payment; webhooks are authoritative.
