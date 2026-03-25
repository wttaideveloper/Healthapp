# Backend Sync Route for RevenueCat (HealthAge)

Use this route to receive app-side RevenueCat snapshots and keep backend license status authoritative.

## API Base + Auth
- Base path: `/api/v1`
- Protected routes require header: `Authorization: Bearer <access_token>`

## Backend Route Map (Frontend Use)
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (protected)
- `POST /api/v1/licenses/activate` (protected, enterprise license key)
- `POST /api/v1/licenses/revenuecat/sync` (protected, RevenueCat snapshot sync)
- `GET /api/v1/licenses/me` (protected, unified license state for app)
- `GET /api/v1/health`
- `GET /api/v1/health/ready`

## Tables
- `users`
- `email_verifications`
- `licenses`
- `license_activations`
- `revenuecat_subscriptions`

## RevenueCat Sync Route
- Method: `POST`
- Path: `/api/v1/licenses/revenuecat/sync`
- Platform allowed: `ios | android | macos`
- Entitlement allowed: `pro`
- `appUserId` mismatch is ignored/overridden with JWT user

Set app env:
- `EXPO_PUBLIC_REVENUECAT_SYNC_PATH=/licenses/revenuecat/sync`

## Request Body
```json
{
  "appUserId": "user_123",
  "platform": "ios",
  "entitlementId": "pro",
  "isActive": true,
  "autoRenewing": true,
  "expiryDate": "2027-03-22T00:00:00.000Z",
  "productId": "com.wtt.healthage.pro.yearly",
  "transactionId": "1000001234567890",
  "originalTransactionId": "1000001234567000",
  "customerInfo": {
    "originalAppUserId": "user_123",
    "activeSubscriptions": ["com.wtt.healthage.pro.yearly"],
    "latestExpirationDate": "2027-03-22T00:00:00.000Z",
    "entitlementsActive": ["pro"]
  }
}
```

## Response
Return 200 with updated license snapshot:
```json
{
  "ok": true,
  "data": {
    "isLicensed": true,
    "expiresAt": "2027-03-22T00:00:00.000Z"
  }
}
```

## Validation Rules
- Reject unauthenticated requests (`401`).
- Ignore/override mismatched `appUserId` from body; trust user from JWT.
- Validate `platform` in `ios|android|macos`.
- Validate `entitlementId` against allowed entitlements (for now: `pro`).
- Parse `expiryDate` as nullable ISO date.

## Merge Logic (recommended)
1. Load current license row for authenticated user.
2. Map incoming entitlement/product to your plan (`$49/year` annual).
3. Update fields:
   - `is_active = isActive`
   - `auto_renewing = autoRenewing`
   - `expires_at = expiryDate`
   - store `product_id`, `transaction_id`, `original_transaction_id`
   - `last_source = 'revenuecat_client_sync'`
4. Return normalized payload compatible with app’s `/licenses/me` parser (`isLicensed`, `expiresAt`).

## Minimal Express Example
```ts
import type { Request, Response } from "express";
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/v1/licenses/revenuecat/sync", requireAuth, async (req: Request, res: Response) => {
  const userId = req.user.id; // from JWT middleware

  const {
    platform,
    entitlementId,
    isActive,
    autoRenewing,
    expiryDate,
    productId,
    transactionId,
    originalTransactionId,
  } = req.body ?? {};

  if (!["ios", "android", "macos"].includes(platform)) {
    return res.status(400).json({ message: "Invalid platform" });
  }

  if (entitlementId !== "pro") {
    return res.status(400).json({ message: "Unsupported entitlementId" });
  }

  const expiresAt = expiryDate ? new Date(expiryDate) : null;
  if (expiryDate && Number.isNaN(expiresAt?.getTime())) {
    return res.status(400).json({ message: "Invalid expiryDate" });
  }

  const updated = await db.license.upsertByUserId(userId, {
    isActive: Boolean(isActive),
    autoRenewing: Boolean(autoRenewing),
    expiresAt,
    productId: productId ?? null,
    transactionId: transactionId ?? null,
    originalTransactionId: originalTransactionId ?? null,
    source: "revenuecat_client_sync",
  });

  return res.json({
    ok: true,
    data: {
      isLicensed: Boolean(updated.isActive),
      expiresAt: updated.expiresAt ? updated.expiresAt.toISOString() : null,
    },
  });
});
```

## Webhook Recommendation (important)
Keep this route, but also configure RevenueCat server webhooks to your backend for authoritative reconciliation and retries. Webhook events should update the same license table used by `/licenses/me`.

## Current Support Matrix
- RevenueCat: Yes (`ios`, `android`, `macos`)
- Enterprise license key: Yes
- Stripe (web/windows/mac installer): Not yet
