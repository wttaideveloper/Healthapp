# Health Age

**Health Age** is a cross-platform (iOS, Android, Web, Windows Desktop) Expo React Native app for **health-age assessments** and personalized report generation.

Users complete a step-by-step health questionnaire → the app calculates their **Health Age** vs **Actual Age** + **Potential Age** using a bundled Excel lookup table → generates a personalized PDF report with lifestyle recommendations, medical sources, and disclaimers.

Built by **Wisdom Tooth Technologies**.

---

## Core Features

| Feature | Description |
|---------|-------------|
| **Health Assessment Wizard** | 8-step flow collecting name, age, gender, height, weight, waist circumference, blood pressure, blood glucose — with unit toggles (metric/imperial) |
| **Lifestyle Questionnaire** | Follow-up questions on diet, exercise, sleep, smoking, alcohol, etc. for habit scoring |
| **Health Age Calculation** | Looks up `Health_Age_Table.xlsx` using age + habit score to derive health age delta |
| **Report Generation** | Displays Health Age, Potential Age, BMI, BP/glucose status, personalized recommendations, medical sources — with PDF export/share |
| **Report History** | List, view, search, filter, and delete past reports with pagination |
| **Report Groups** | Organize reports into groups with CSV export |
| **Premium (Pro)** | History, grouping, CSV export, blank questionnaire/report printing, report settings — gated behind subscription |
| **Multi-language** | 13 languages (English, Hindi, Spanish, Japanese, French, Chinese, Korean, Russian, Portuguese, German, Vietnamese, Malagasy, Danish, Tamil) |
| **Auth** | Email/password sign-up/sign-in with email verification via backend API |

---

## Screens / Flow

```
Splash → Language Selection → Intro (3 screens) → Sign In / Sign Up
                                                      ↓
                                              Drawer Navigator
                                           ┌──────────────────┐
                                           │ HomeScreen        │
                                           │ healthAgeTest     │ ← 8-step wizard
                                           │ QuestionsScreen   │ ← Lifestyle scoring
                                           │ InterestScreen    │ ← Score calculation
                                           │ ReportScreen      │ ← PDF view/export
                                           │ HistoryScreen     │ ← Report list/groups
                                           │ PurchaseScreen    │ ← Subscription
                                           │ ReportSettings    │
                                           │ PrintScreen       │
                                           │ AboutAppScreen    │
                                           └──────────────────┘
```

| Screen | Purpose |
|--------|---------|
| `healthAgeTest.tsx` | Vital signs collection wizard (8 steps) |
| `QuestionsScreen.tsx` | Lifestyle habits questionnaire |
| `InterestScreen.tsx` | Calculates total habit score from answers |
| `ReportScreen.tsx` | Health Age report display + PDF generation/sharing |
| `HistoryScreen.tsx` | Report list, groups, filtering, delete, CSV export |
| `HomeScreen.tsx` | Landing/home dashboard |
| `PurchaseScreen.tsx` | RevenueCat (native) / Stripe (web) subscription purchase |
| `ReportSettings.tsx` | Premium gated report preferences |
| `PrintScreen.tsx` | Blank questionnaire / report printing |
| `GroupDetailsScreen.tsx` | Reports within a group |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Expo SDK 53, React Native 0.79 |
| **Language** | TypeScript |
| **Navigation** | React Navigation (Drawer + Stack + Bottom Tabs) |
| **Storage** | SQLite (`expo-sqlite`) on native; AsyncStorage on web |
| **Auth** | Custom auth service with JWT + AsyncStorage persistence |
| **i18n** | `i18next` + `react-i18next` (13 languages) |
| **Payments** | RevenueCat (iOS/Android IAP) + Stripe (Web/Mac Catalyst) |
| **PDF** | `expo-print` + `react-native-html-to-pdf` (native); backend render fallback (web) |
| **Excel** | `xlsx` + `expo-file-system` for loading `Health_Age_Table.xlsx` |
| **Desktop** | Electron + electron-builder for Windows NSIS/AppX packaging |

---

## Monetization / Premium Gates

- **Free**: Complete health assessment, view report, PDF export/share
- **Pro (subscription)**: Report history, grouping, CSV export, print questionnaire/report, report settings

### Subscription Architecture

- **SubscriptionProvider** (`subScriptionContext.tsx`) merges entitlements from:
  - Backend API (`/entitlements/me`) — primary source
  - RevenueCat (native) — fallback for signed-out users
- Cached in AsyncStorage for fast UI startup
- Debug override in dev: `AsyncStorage.setItem('debug_subscription_override', 'true')`

---

## Key Utilities

| File | Purpose |
|------|---------|
| `readExcel.ts` | Loads `Health_Age_Table.xlsx`; exports `calculateHealthAge(age, habitScore)` and `calculatePotentialHealthAge(age, habitScore)` |
| `BmiCalculation.ts` | BMI calculation + category classification with metric/imperial support |
| `reportService.ts` / `.web.ts` | CRUD for reports and groups (SQLite native / AsyncStorage web) |
| `purchase.ts` | RevenueCat configuration, get/cache purchases, Stripe checkout/portal, backend sync |
| `authService.ts` | Sign-in, sign-up, email verification, profile fetch |
| `database.ts` / `.web.ts` | Database initialization and helpers |
| `medicalSources.ts` | Citation URLs for health recommendations |
| `bloodPressure.ts` | Blood pressure classification utilities |
| `i18n.ts` | i18next configuration |

---

## Prerequisites

- Node.js 22.12.0+
- npm
- Xcode (iOS builds)
- Android Studio (Android builds)
- Windows 10/11 (Windows desktop packaging)

---

## Setup

```bash
npm install
cp .env.example .env   # Add API keys for backend/subscriptions
```

---

## Running Locally

```bash
npm run start        # Expo dev server
npm run android      # Android device/emulator
npm run ios          # iOS simulator
npm run web          # Web (port 8081)
```

### Electron Desktop Preview

Terminal 1:
```bash
npm run web
```

Terminal 2 (macOS/Linux):
```bash
ELECTRON_START_URL=http://localhost:8081 npm run electron
```

Windows PowerShell:
```powershell
$env:ELECTRON_START_URL="http://localhost:8081"; npm run electron
```

Production preview:
```bash
npm run electron:preview
```

---

## Building

```bash
npm run build:web           # Production web → dist/
npm run dist:win:dir        # Windows unpacked dir
npm run dist:win            # Windows NSIS installer
npm run dist:win:arm64      # Windows ARM64 installer
npm run dist:win:store      # Windows AppX (Microsoft Store)
```

---

## Environment Variables

```
EXPO_PUBLIC_API_BASE_URL=                          # Backend API root
EXPO_PUBLIC_ENTITLEMENT_STATUS_PATH=               # e.g. /entitlements/me
EXPO_PUBLIC_STRIPE_CHECKOUT_PATH=                  # e.g. /stripe/checkout
EXPO_PUBLIC_STRIPE_PORTAL_PATH=                    # e.g. /stripe/portal
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=                # RevenueCat iOS key
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=            # RevenueCat Android key
EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID=             # Entitlement identifier
EXPO_PUBLIC_REVENUECAT_OFFERING_ID=                # Offering identifier
EXPO_PUBLIC_REVENUECAT_PACKAGE_ID=                 # Package identifier
EXPO_PUBLIC_REVENUECAT_PRODUCT_IDS=                # Comma-separated product IDs
EXPO_PUBLIC_REVENUECAT_SYNC_PATH=                  # Backend sync endpoint
EXPO_PUBLIC_MAC_CATALYST_BILLING_MODE=             # stripe or iap (Mac only)
EXPO_PUBLIC_MAC_STRIPE_SUCCESS_URL=                # Mac Stripe return URLs
EXPO_PUBLIC_MAC_STRIPE_CANCEL_URL=
EXPO_PUBLIC_MAC_STRIPE_PORTAL_RETURN_URL=
```

---

## Important Project Files

```
App.tsx                                    # App bootstrap, providers, navigation
src/navigation/
├── AppNavigator.tsx                       # Root stack (Splash, Auth, Onboarding, Drawer)
├── DrawerNavigator.tsx                    # Drawer (native) / WebStack (web desktop)
└── BottomTabNavigator.tsx                 # Bottom tabs
src/screens/                               # All screen components
src/components/
├── CustomDrawer.tsx                       # Drawer content
├── CustomInput.tsx, Button.tsx, modal.tsx # Shared UI
└── utils/
    ├── database.ts / database.web.ts      # SQLite / AsyncStorage persistence
    ├── reportService.ts / .web.ts         # Report CRUD
    ├── readExcel.ts                       # Health Age table loading + calculation
    ├── BmiCalculation.ts                  # BMI logic
    ├── purchase.ts                        # RevenueCat + Stripe
    ├── authService.ts                     # Backend auth API
    ├── api.ts                             # HTTP client
    ├── i18n.ts                            # i18next config
    └── medicalSources.ts                  # Citation links
assets/files/
├── Health_Age_Table.xlsx                  # Core calculation data (MUST be bundled)
├── Reports/{lang}.pdf                     # Report PDF assets per language
└── Questionnaires/{lang}.pdf              # Blank questionnaire PDFs
electron/main.cjs                          # Electron shell for packaged web assets
```

---

## Architecture Notes

- **Platform-specific code**: `.web.ts` files provide browser-compatible implementations of database and report storage (AsyncStorage) vs native SQLite
- **Auth flow**: `AuthProvider` hydrates from AsyncStorage on startup; verifies token via `/me` endpoint; supports sign-up with email verification
- **Subscription flow**: `SubscriptionProvider` caches in AsyncStorage, syncs RevenueCat purchases to backend, handles account switching
- **Health Age calculation**: Reads `Health_Age_Table.xlsx` via `xlsx`, finds the age row, looks up the column matching user's habit score, returns `age + delta`
- **Web desktop navbar** (`DrawerNavigator.tsx:WebNavigator`): When `Platform.OS === 'web' && width >= 900`, a custom top navbar replaces the drawer layout
- **PDF**: Native uses `expo-print` → fallback to `react-native-html-to-pdf`; Web uses backend render API → fallback to browser print dialog

---

## Useful Checks

```bash
npx tsc --noEmit            # TypeScript check
npx expo-doctor             # Expo diagnostics
```

---

## Documentation

- `REVENUECAT_SETUP.md` — RevenueCat configuration guide
- `WINDOWS_BUILD_GUIDE.md` — Microsoft Store packaging and signing
