# Feature Card #002: RN Watchlist

- **Status**: Completed (Updated for RN Application Boundary)
- **Target Component**: React Native Application (`rn/src/watchlist/`)
- **Primary Screen**: `WatchlistScreen.tsx`
- **Host Integration**: Android Feature Hub (`FeatureHubScreen.kt` -> `WatchlistActivity.kt` -> `"WatchlistRoot"`)

---

## 1. Overview & Role

Feature Card #002 establishes a production-oriented **RN Watchlist Feature Application** within the React Native application layer.

The feature presents an asset watchlist overview, account balance summary, Donut Allocation Chart, and asset detail list. It establishes clean architectural boundaries separating data acquisition, DTO-to-Domain mapping, repository orchestration, React hook state management, and UI component presentation.

---

## 2. Locked Directory Structure

All files for Feature Card #002 are placed strictly within the following directory tree:

```text
rn/
└── src/
    └── watchlist/
        ├── WatchlistRoot.tsx        ← Root Component ("WatchlistRoot")
        ├── WatchlistApp.tsx         ← Application Composition Layer
        ├── navigation/              ← Navigation & Router Layer
        │   ├── AppRouter.tsx
        │   └── routes.ts
        ├── screens/
        │   └── WatchlistScreen.tsx  ← Feature Screen
        ├── components/              ← UI Presentation Components
        │   ├── WatchlistHeader.tsx
        │   ├── WatchlistSummaryCard.tsx
        │   ├── WatchlistAllocationChart.tsx
        │   ├── WatchlistAssetsCard.tsx
        │   ├── WatchlistSourceSwitch.tsx
        │   ├── WatchlistAssetRow.tsx
        │   ├── WatchlistSkeleton.tsx
        │   └── WatchlistStateViews.tsx
        ├── hooks/                   ← React Lifecycle & UI State
        │   └── useWatchlist.ts
        ├── model/                   ← DTO & Domain Model Interfaces
        │   ├── WatchlistApiResponse.ts
        │   └── WatchlistAsset.ts
        ├── data/                    ← Data Sources & Mapper
        │   ├── WatchlistDataSource.ts
        │   ├── DemoDataSource.ts
        │   ├── ApiDataSource.ts
        │   ├── WatchlistMapper.ts
        │   └── mock/
        │       └── watchlist-response.json
        └── WatchlistRepository.ts   ← Application Data Orchestration
```

---

## 3. Architecture Boundary & Placement

```text
React Native Application Layer (rn/src/watchlist/)
    │
    ├── Root Entry (WatchlistRoot.tsx)
    ├── App Composition (WatchlistApp.tsx)
    ├── Navigation Router (AppRouter.tsx)
    ├── Watchlist Screen Container (WatchlistScreen.tsx)
    ├── State Lifecycle Hook (useWatchlist.ts)
    ├── Repository Orchestration (WatchlistRepository.ts)
    ├── Data Sources (DemoDataSource.ts & ApiDataSource.ts)
    ├── Domain Mapper (WatchlistMapper.ts)
    └── Vector Donut Allocation Chart (WatchlistAllocationChart.tsx)

Android Native Platform Layer (android/)
    │
    ├── Feature Hub Launcher (FeatureHubScreen.kt - isActive = true)
    └── React Native Host Activity (WatchlistActivity.kt -> "WatchlistRoot")
```

---

## 4. End-to-End Data Flow

```text
WatchlistScreen UI
      │
      ▼
useWatchlist() Custom Hook
      │
      ▼ (selects IWatchlistDataSource via getDataSource factory)
WatchlistRepository
      │
      ▼
IWatchlistDataSource Boundary
      ├── DemoDataSource  ──► Reads watchlist-response.json (+ 600ms latency)
      └── ApiDataSource   ──► Executes fetch() HTTP request
      │
      ▼
WatchlistApiResponse (Raw DTO)
      │
      ▼
WatchlistMapper.mapResponseToDomain()
      │ (calculates marketValueUsd, allocationPercent, change24hUsd)
      ▼
{ summary: WatchlistSummary, assets: WatchlistAsset[] } (Domain Payload)
      │
      ▼
useWatchlist() Updates React State
      │
      ▼
WatchlistScreen & Subcomponents Render
```

---

## 5. Information Architecture & Three-Card Layout

The page is structured into three primary content cards sharing consistent dark Web3 container styling (`#161B22` surface, `#30363D` border, `12dp` radius):

```text
Watchlist Header
  ↓
Card 1: Portfolio Balance (WatchlistSummaryCard)
  ↓
Card 2: Asset Allocation (WatchlistAllocationChart: Donut + Legend)
  ↓
Card 3: Your Assets (WatchlistAssetsCard: BTC, ETH, SOL, USDC in one card with dividers)
  ↓
Bottom Control: Data Source (WatchlistSourceSwitch: [ Demo | API ])
```

---

## 6. Verification & Results

- **Build Verification**: `./gradlew :app:assembleDebug` executed successfully.
- **Native Integration**: Registered `BridgeActivity` and `WatchlistActivity` in `AndroidManifest.xml`.
- **UI Cleanliness**: Verified Watchlist Application contains zero Bridge Test tabs or controls.
