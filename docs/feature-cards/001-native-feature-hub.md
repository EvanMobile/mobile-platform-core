# Feature Card #001: Feature Hub

- **Status**: Completed (Updated for RN Application Boundary)
- **Target Component**: Android Platform (`:app`)
- **Primary Class**: `com.mobile.platform.presentation.compose.FeatureHubActivity`
- **Related Entries**: 
  - `com.mobile.platform.presentation.compose.BridgeActivity` -> `"BridgeRoot"`
  - `com.mobile.platform.presentation.compose.WatchlistActivity` -> `"WatchlistRoot"`

---

## 1. Overview & Role

Feature Card #001 establishes the **Feature Hub** as the primary application entry and feature scheduler for the Android platform.

Rather than presenting a raw React Native screen directly upon launch, the Android host application launches into `FeatureHubActivity` built with Jetpack Compose. From the Feature Hub, users and developers can access active platform capabilities or observe upcoming feature placeholders.

---

## 2. Activity Architecture & Responsibilities

```text
Android App Launch
        │
        ▼
FeatureHubActivity (MAIN / LAUNCHER)
        │
        ├── Native ↔ RN Bridge (Active)
        │       │
        │       ▼ [Intent]
        │   BridgeActivity (ReactActivity)
        │       │
        │       ▼ getMainComponentName()
        │   "BridgeRoot"
        │       │
        │       ▼ AppRegistry.registerComponent
        │   rn/src/bridge/BridgeRoot.tsx
        │       │
        │       ▼
        │   BridgeApp.tsx -> AppRouter.tsx -> BridgeTestScreen.tsx
        │       │
        │       ▼ AppBridge.hello()
        │   "Android Native OK"
        │
        ├── RN Watchlist (Active)
        │       │
        │       ▼ [Intent]
        │   WatchlistActivity (ReactActivity)
        │       │
        │       ▼ getMainComponentName()
        │   "WatchlistRoot"
        │       │
        │       ▼ AppRegistry.registerComponent
        │   rn/src/watchlist/WatchlistRoot.tsx
        │       │
        │       ▼
        │   WatchlistApp.tsx -> AppRouter.tsx -> WatchlistScreen.tsx
        │
        ├── Biometric           (Coming Soon)
        ├── Secure Storage      (Coming Soon)
        ├── WebView             (Coming Soon)
        ├── Web3 Wallet         (Coming Soon)
        └── Realtime Monitor    (Coming Soon)
```

### Component Details

1. **`FeatureHubActivity`** (`ComponentActivity`)
   - Registered in `AndroidManifest.xml` with `MAIN` and `LAUNCHER` intent filters.
   - Renders `FeatureHubScreen` via Jetpack Compose `setContent {}`.
   - Title: **Mobile Platform**, Subtitle: **Feature Hub**.
   - Handles explicit Android `Intent` navigation to `BridgeActivity` or `WatchlistActivity`.

2. **`BridgeActivity`** (`ReactActivity`)
   - Hosts the React Native container for Bridge Capability (`"BridgeRoot"`).
   - Retains all React Native runtime setup, lifecycle delegates, and `AppBridgePackage` bindings.

3. **`WatchlistActivity`** (`ReactActivity`)
   - Hosts the React Native container for Watchlist Feature (`"WatchlistRoot"`).

4. **Package Placement**
   - Activities and the screen composable reside in `com.mobile.platform.presentation.compose`.

---

## 3. Existing Bridge Preservation

The Native ↔ RN Bridge implementation is strictly preserved:
- `AppBridgeModule.kt` continues to handle `AppBridge.hello()`.
- Promise resolution returns `"Android Native OK"`.
- `rn/src/bridge/screens/BridgeTestScreen.tsx` retains the **Call Android Native** action button.
- "Android Native OK" serves as the concrete, non-mocked integration verification result for the Native ↔ RN Bridge capability.

---

## 4. Feature Entry List

| Feature | Status | Action / Target |
|---|---|---|
| Native ↔ RN Bridge | Active | Launches `BridgeActivity` ("BridgeRoot") |
| RN Watchlist | Active | Launches `WatchlistActivity` ("WatchlistRoot") |
| Biometric | Coming Soon | Placeholder |
| Secure Storage | Coming Soon | Placeholder |
| WebView | Coming Soon | Placeholder |
| Web3 Wallet | Coming Soon | Placeholder |
| Realtime Monitor | Coming Soon | Placeholder |

---

## 5. Verification Results

- **Build Verification**: `./gradlew :app:assembleDebug` executed successfully.
- **Runtime Navigation**: `FeatureHubActivity` -> `BridgeActivity` / `WatchlistActivity` via native Intent.
- **Bridge Verification**: `AppBridge.hello()` successfully returns `"Android Native OK"`.
