# Feature Card #001: Feature Hub

- **Status**: Completed
- **Target Component**: Android Platform (`:app`)
- **Primary Class**: `com.mobile.platform.presentation.compose.FeatureHubActivity`
- **Related Entry**: `com.mobile.platform.presentation.compose.NativeRnBridgeActivity`

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
        │   NativeRnBridgeActivity (ReactActivity)
        │       │
        │       ▼
        │   React Native Runtime (rn/src/App.tsx)
        │       │
        │       ▼
        │   AppBridge.hello()
        │       │
        │       ▼
        │   "Android Native OK"
        │
        ├── RN Watchlist        (Coming Soon)
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
   - Handles simple Android `Intent` navigation to `NativeRnBridgeActivity`.

2. **`NativeRnBridgeActivity`** (`ReactActivity`)
   - Relocated directly from old `MainActivity`.
   - Hosts the React Native container (`MobilePlatform`).
   - Retains all React Native runtime setup, lifecycle delegates, and `AppBridgePackage` bindings.

3. **Package Placement**
   - Both activities and the screen composable reside in `com.mobile.platform.presentation.compose`.

---

## 3. Existing Bridge Preservation

The Native ↔ RN Bridge implementation is strictly preserved and relocated without redesign:
- `AppBridgeModule.kt` continues to handle `AppBridge.hello()`.
- Promise resolution returns `"Android Native OK"`.
- `rn/src/App.tsx` retains the **Call Android Native** action button.
- "Android Native OK" serves as the concrete, non-mocked integration verification result for the Native ↔ RN Bridge capability.

---

## 4. Feature Entry List

| Feature | Status | Action / Target |
|---|---|---|
| Native ↔ RN Bridge | Active | Launches `NativeRnBridgeActivity` |
| RN Watchlist | Coming Soon | Placeholder |
| Biometric | Coming Soon | Placeholder |
| Secure Storage | Coming Soon | Placeholder |
| WebView | Coming Soon | Placeholder |
| Web3 Wallet | Coming Soon | Placeholder |
| Realtime Monitor | Coming Soon | Placeholder |

No speculative code, ViewModels, DI modules, or empty feature packages were created for the placeholder entries.

---

## 5. Verification Results

- **Build Verification**: `./gradlew :app:assembleDebug` executed successfully.
- **Runtime Navigation**: `FeatureHubActivity` -> `NativeRnBridgeActivity` via native Intent.
- **Bridge Verification**: `AppBridge.hello()` successfully returns `"Android Native OK"`.
