# RevenueCat Test-Store Setup (HealthAge)

## 1) Required Native Environment Variables
Set these in your local `.env` (test store first):

- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID` (example: `pro`)
- `EXPO_PUBLIC_REVENUECAT_OFFERING_ID` (example: `default`)
- `EXPO_PUBLIC_REVENUECAT_PACKAGE_ID` (example: `$rc_annual`)

Optional:

- `EXPO_PUBLIC_REVENUECAT_PRODUCT_IDS` (comma-separated fallback product IDs)
- `EXPO_PUBLIC_REVENUECAT_SYNC_PATH` (example: `/licenses/revenuecat/sync`)

The app now expects these RevenueCat values on native and shows setup errors in the purchase screen when missing.

## 2) Product / Offering Shape
For the current app flow:

- Use one annual plan (`$49/year` target)
- Ensure the configured offering contains the configured package ID
- Ensure that package grants the configured entitlement ID

## 3) Native vs Web Split
- Native (`ios`/`android`): RevenueCat subscriptions
- Web: Stripe checkout endpoint (`EXPO_PUBLIC_STRIPE_CHECKOUT_PATH`)

## 4) Backend Sync Endpoint Contract (Client -> Backend)
When `EXPO_PUBLIC_REVENUECAT_SYNC_PATH` is configured, app sends a POST payload after purchase/restore/forced refresh with fields:

- `appUserId`
- `platform`
- `entitlementId`
- `isActive`
- `autoRenewing`
- `expiryDate`
- `productId`
- `transactionId`
- `originalTransactionId`
- `customerInfo` subset:
  - `originalAppUserId`
  - `activeSubscriptions`
  - `latestExpirationDate`
  - `entitlementsActive`

Recommended backend behavior:

1. Verify the user identity from auth token
2. Validate payload and map entitlement/product to your license record
3. Persist license status and expiry for that user
4. Keep backend license status as source of truth for app gating

## 5) Recommended Server-Side Webhook
Even with client sync enabled, configure RevenueCat webhooks on backend for authoritative reconciliation and retry-safe updates.
