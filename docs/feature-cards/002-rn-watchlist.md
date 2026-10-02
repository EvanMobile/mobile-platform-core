# Feature Card #002: RN Watchlist

- **Status**: Completed
- **Target Component**: React Native Application (`rn/src/features/watchlist/`)
- **Primary Screen**: `WatchlistScreen.tsx`
- **Host Integration**: Android Feature Hub (`FeatureHubScreen.kt` -> `NativeRnBridgeActivity.kt`)

---

## 1. Overview & Role

Feature Card #002 establishes a production-oriented **RN Watchlist Feature Slice** within the React Native application layer.

The feature presents an asset watchlist overview, account balance summary, Donut Allocation Chart, and asset detail list. It establishes clean architectural boundaries separating data acquisition, DTO-to-Domain mapping, repository orchestration, React hook state management, and UI component presentation.

### Primary Engineering Objectives

1. **TypeScript Type Modeling**: Strict separation between API DTOs (`WatchlistApiResponse`) and Application Domain Models (`WatchlistAsset`, `WatchlistSummary`).
2. **Data Layer Architecture**: Data Source Boundary (`IWatchlistDataSource`) with `DemoDataSource` (local JSON mock) and `ApiDataSource` (fetch HTTP client).
3. **Pure Domain Mapping**: `WatchlistMapper` performing pure data transformation and financial calculations without leaking into UI or Data Sources.
4. **Repository Pattern**: `WatchlistRepository` orchestrating DataSource calls and Mapping without holding React state or UI references.
5. **State Lifecycle Management**: `useWatchlist()` hook handling initial loading, skeleton states, pull-to-refresh, empty results, error handling, and runtime data-source switching.
6. **Async Race Protection**: Request sequence token tracking (`requestIdRef`) ensuring stale asynchronous responses cannot overwrite newer React state.
7. **Performance List Rendering**: `FlatList` list rendering with `React.memo` row components and stabilized callbacks (`useCallback`).
8. **Vector Donut Visualization**: `WatchlistAllocationChart` implemented as a Donut Allocation Chart using `react-native-svg` stroke dash arcs.
9. **Refined UX State Feedback**: Production-oriented state preservation during source switching and refresh errors, utilizing native `Alert.alert` dialogs and lightweight `ActivityIndicator` spinners.
10. **Unified Product Information Architecture**: Structured three-card hierarchy (**Portfolio Balance**, **Asset Allocation**, **Your Assets**) with bottom Data Source development controls.

---

## 2. Locked Directory Structure

All files for Feature Card #002 are placed strictly within the following directory tree:

```text
rn/
└── src/
    └── features/
        └── watchlist/
            │
            ├── components/              ← UI Presentation Components
            │   ├── WatchlistHeader.tsx
            │   ├── WatchlistSummaryCard.tsx
            │   ├── WatchlistAllocationChart.tsx
            │   ├── WatchlistAssetsCard.tsx
            │   ├── WatchlistSourceSwitch.tsx
            │   ├── WatchlistAssetRow.tsx
            │   ├── WatchlistSkeleton.tsx
            │   └── WatchlistStateViews.tsx
            │
            ├── hooks/                   ← React Lifecycle & UI State
            │   └── useWatchlist.ts
            │
            ├── model/                   ← DTO & Domain Model Interfaces
            │   ├── WatchlistApiResponse.ts
            │   └── WatchlistAsset.ts
            │
            ├── data/                    ← Data Sources & Mapper
            │   ├── WatchlistDataSource.ts
            │   ├── DemoDataSource.ts
            │   ├── ApiDataSource.ts
            │   ├── WatchlistMapper.ts
            │   └── mock/
            │       └── watchlist-response.json
            │
            ├── WatchlistRepository.ts   ← Application Data Orchestration
            │
            └── WatchlistScreen.tsx      ← Feature Container Screen
```

---

## 3. Architecture Boundary & Placement

```text
React Native Application Layer (rn/src/features/watchlist/)
    │
    ├── Watchlist UI & Screen Container (WatchlistScreen.tsx)
    ├── State Lifecycle Hook (useWatchlist.ts)
    ├── Repository Orchestration (WatchlistRepository.ts)
    ├── Data Sources (DemoDataSource.ts & ApiDataSource.ts)
    ├── Domain Mapper (WatchlistMapper.ts)
    └── Vector Donut Allocation Chart (WatchlistAllocationChart.tsx)

Android Native Platform Layer (android/)
    │
    ├── Feature Hub Launcher (FeatureHubScreen.kt - isActive = true)
    └── React Native Host Activity (NativeRnBridgeActivity.kt)
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

## 6. Mock Data & Portfolio Invariant

`rn/src/features/watchlist/data/mock/watchlist-response.json` satisfies the portfolio balance invariant:
$$\text{accountValueUsd} = \sum (\text{asset.balance} \times \text{asset.priceUsd}) = 100,000.00$$

- BTC: 1.0 × $60,000 = $60,000.00 (60.0%)
- ETH: 10.0 × $3,000 = $30,000.00 (30.0%)
- SOL: 50.0 × $150 = $7,500.00 (7.5%)
- USDC: 2,500.0 × $1 = $2,500.00 (2.5%)
- Total Allocation: 100.0%

---

## 7. Donut Allocation Chart Architecture Revision & Native Integration

- **Decision Revision**: Approved adding `react-native-svg` as the vector rendering primitive for `WatchlistAllocationChart.tsx`.
- **Implementation**: Uses `<Svg>`, `<G>`, and `<Circle>` stroke dash arcs (`strokeDasharray` and `strokeDashoffset`) to render SVG Donut ring + color-coded percentage legend.
- **Native Integration**: Integrated `:react-native-svg` into `android/settings.gradle.kts`, `android/app/build.gradle.kts`, and registered `com.horcrux.svg.SvgPackage()` in `MobilePlatformApplication.kt`.
- **Result**: Renders 4 distinct, vector-smooth arcs corresponding to BTC (60%), ETH (30%), SOL (7.5%), and USDC (2.5%).

---

## 8. UX State Feedback Refinement

1. **Initial Load**: Displays `WatchlistSkeleton` when `assets.length === 0`.
2. **Source Switch Loading**: When toggling `Demo` <-> `API` over existing data (`assets.length > 0`), existing content remains visible on screen and `WatchlistSourceSwitch` displays a lightweight `ActivityIndicator` spinner.
3. **Failure Over Existing Data**: When a refresh or source-switch fails while data is displayed (`assets.length > 0`), existing asset data remains visible and a native React Native `Alert.alert('Request Failed', errorMessage)` is presented.
4. **Initial Empty Failure**: Initial load failure with zero existing data (`assets.length === 0`) continues to display the full-screen `WatchlistErrorState` with "Try Again" action.

---

## 9. Verification & Results

- **Build Verification**: `./gradlew :app:assembleDebug` executed successfully.
- **Native Integration**: Registered `com.horcrux.svg.SvgPackage()` in `MobilePlatformApplication.kt`, included `:react-native-svg` in `settings.gradle.kts` and `build.gradle.kts`.
- **Dependency Status**: `react-native-svg` v15.2.0 installed in `rn/package.json` for RN 0.74.5 compatibility.
- **UX Refinement**: Verified transient loading spinner in `WatchlistSourceSwitch`, data preservation on reload, and native `Alert.alert` dialogs on failure over existing data.
- **Git Status**: 0 git commits or pushes performed. Clean workspace awaiting human double check.
