# Stripe Backend Session + Licensing Doc (HealthAge)

This document defines what backend routes are needed for Stripe, what each route should do, and how Stripe events should update your unified `licenses` model.

Use this when implementing web/desktop payments (web, Windows installer, macOS direct build).

## 1) Goals
- Create Stripe checkout session for authenticated user.
- Handle Stripe webhook events safely and idempotently.
- Keep backend `licenses` table as single source of truth.
- Return license status to app via `GET /api/v1/licenses/me`.

## 2) API Base + Auth
- Base path: `/api/v1`
- Protected endpoints require:
  - `Authorization: Bearer <access_token>`

## 3) Required Routes

### A) Create Checkout Session
- Method: `POST`
- Path: `/api/v1/stripe/checkout`
- Auth: required
- Request body (minimal):
```json
{
  "priceId": "price_xxx_optional_if_server_has_default"
}
```
- Response:
```json
{
  "ok": true,
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

What it should do:
1. Resolve authenticated user.
2. Create/reuse Stripe customer for that user.
3. Create Stripe Checkout Session (`mode=subscription`).
4. Include metadata for reconciliation:
   - `userId`
   - `source=web`
   - `provider=stripe`
5. Return hosted checkout URL.

### B) Create Billing Portal Session
- Method: `POST`
- Path: `/api/v1/stripe/portal`
- Auth: required
- Response:
```json
{
  "ok": true,
  "url": "https://billing.stripe.com/p/session/..."
}
```

What it should do:
1. Resolve user Stripe customer id.
2. Create billing portal session.
3. Return portal URL.

### C) Stripe Webhook Receiver
- Method: `POST`
- Path: `/api/v1/stripe/webhook`
- Auth: none (Stripe signature verification required)
- Headers:
  - `stripe-signature: ...`

What it should do:
1. Verify webhook signature with `STRIPE_WEBHOOK_SECRET`.
2. Enforce idempotency by storing `event.id` (ignore duplicates).
3. Map subscription events to unified license state.
4. Upsert `stripe_subscriptions` + update `licenses`.
5. Return 200 quickly after processing.

### D) Unified License Read (already in your backend)
- Method: `GET`
- Path: `/api/v1/licenses/me`
- Auth: required
- Purpose:
  - App checks this endpoint for actual entitlement status.

## 4) Stripe Events You Should Handle
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

Recommended optional:
- `customer.subscription.trial_will_end`

## 5) Mapping Stripe -> License Model
Use one internal normalized state model (shared with RevenueCat flow):
- `isLicensed: boolean`
- `expiresAt: datetime | null`
- `provider: stripe | revenuecat | enterprise`
- `providerStatus: active | trialing | past_due | canceled | unpaid | incomplete`
- `autoRenewing: boolean`

Suggested mapping:
- Stripe `active` or `trialing` => `isLicensed=true`
- Stripe `past_due`, `unpaid`, `incomplete`, `canceled` => `isLicensed=false` (or grace logic if you choose)
- `current_period_end` => `expiresAt`

## 6) Idempotency + Audit
- Create table `billing_events`:
  - `provider` (`stripe`)
  - `event_id` (unique)
  - `event_type`
  - `processed_at`
  - `payload_json`
- If `event_id` already exists, return 200 without reprocessing.
- Store normalized audit row for each applied change.

## 7) Suggested Tables
You already have `licenses`; add/ensure:
- `stripe_customers`
  - `user_id` (unique), `stripe_customer_id`
- `stripe_subscriptions`
  - `stripe_subscription_id` (unique)
  - `user_id`
  - `stripe_customer_id`
  - `price_id`
  - `status`
  - `current_period_end`
  - `cancel_at_period_end`
  - timestamps
- `billing_events` (idempotency + audit)

## 8) Required Environment Variables (Backend)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_ANNUAL` (or plan map)
- `STRIPE_SUCCESS_URL` (e.g. `https://app.example.com/purchase/success`)
- `STRIPE_CANCEL_URL` (e.g. `https://app.example.com/purchase/cancel`)
- `STRIPE_BILLING_PORTAL_RETURN_URL`

## 9) Frontend Contract

### App/Web calls
- `POST /api/v1/stripe/checkout` -> open returned `url`
- `POST /api/v1/stripe/portal` -> open returned `url`
- then poll/refresh `GET /api/v1/licenses/me`

### Important
- Frontend should **not** trust local checkout success alone.
- Frontend should trust backend `licenses/me`.

## 10) Minimal Pseudocode (Webhook)
```ts
POST /api/v1/stripe/webhook:
  event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  if billing_events.exists(event.id): return 200

  begin tx
    save billing_events(event.id, event.type, payload)
    switch event.type:
      case "checkout.session.completed":
        link session.customer + metadata.userId
      case "customer.subscription.created|updated|deleted":
        upsert stripe_subscriptions
        recalc license row for user
      case "invoice.paid":
        mark paid/latest invoice info
      case "invoice.payment_failed":
        update provider status + optional grace policy
  commit
  return 200
```

## 11) Exit Criteria for Stripe Backend Completion
- Checkout URL generation works for authenticated users.
- Portal URL generation works.
- Webhook signature verification passes.
- Duplicate webhook delivery is safe (idempotent).
- `licenses/me` updates correctly for subscribe/renew/cancel/payment-failed flows.
- Web + desktop purchase flow unlocks premium only after backend license is active.
