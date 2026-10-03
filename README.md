# Mobile Platform Core

A production-oriented mobile foundation for building Web3 applications with **React Native as the application layer** and **native platforms providing platform-specific capabilities**.

The project currently focuses on establishing and validating the core mobile architecture through a working **React Native + Android** implementation trunk. Additional security, networking, Web3, wallet, and platform integrations are introduced incrementally as their responsibilities become concrete.

## Architecture

The current implementation trunk is:

```text
                 Mobile Architecture Trunk
                           │
             ┌─────────────┴─────────────┐
             │                           │
      RN Application              Android Platform
             │                           │
             │                     Platform APIs
             └──────────────┬────────────┘
                            │
                   Native-only capabilities
```

### RN Application

React Native is the application's primary cross-platform runtime.

It owns:

- Product business logic
- UI and UX
- Navigation and application flows
- Application state
- Application-level networking
- Web3 application composition

RN can communicate directly with backend services and blockchain RPC endpoints. Native platform APIs are used when a capability depends on platform-specific functionality.

When an isolated feature or capability requires its own entry point, it is structured as an **Independent RN Application Boundary** (`BridgeRoot`, `WatchlistRoot`, etc.) with its own composition, router, and screens.

### Native Platform

Native platform implementations provide capabilities that depend on the operating system, native SDKs, or platform security facilities.

Examples include:

- Secure storage
- Android Keystore and iOS Keychain
- Biometric authentication
- Native wallet protocol integration such as Solana Mobile Wallet Adapter
- Native WebView capabilities
- Platform-specific SDK integration
- Other OS-specific runtime capabilities

Native platforms do not become the owner of product-level application business logic simply because a feature uses native functionality.

### Platform API

The Platform API defines the boundary through which the RN Application consumes native-only capabilities.

```text
RN Application
      │
      │ Platform API
      ▼
Native Platform
      │
      ├── Security
      ├── Secure Storage
      ├── Wallet Integration
      ├── WebView
      └── Other Platform Capabilities
```

The Platform API is not a mandatory gateway for all application networking or business logic. It exists where a feature requires native platform functionality.

---

## Project Structure

```text
mobile-platform-core/
├── android/
│   ├── app/
│   │   └── src/main/kotlin/com/mobile/platform/
│   │       ├── bridge/
│   │       │   ├── AppBridgeModule.kt
│   │       │   └── AppBridgePackage.kt
│   │       ├── presentation/
│   │       │   └── compose/
│   │       │       ├── FeatureHubActivity.kt
│   │       │       ├── FeatureHubScreen.kt
│   │       │       ├── BridgeActivity.kt
│   │       │       └── WatchlistActivity.kt
│   │       └── MobilePlatformApplication.kt
│   ├── core/
│   │   ├── common/
│   │   ├── state/
│   │   ├── network/
│   │   ├── security/
│   │   ├── web3/
│   │   └── webview/
│   ├── build-logic/
│   ├── gradle/
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── gradlew
│
├── rn/
│   ├── src/
│   │   ├── bridge/         # Card #001 Bridge Application Boundary
│   │   └── watchlist/      # Card #002 Watchlist Application Boundary
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── ios/
│   ├── README.md
│   └── ...
│
└── flutter/
    └── README.md
```

The repository keeps the Android native project and React Native project as separate technical roots within a single Git repository.

- `android/` — Android native platform implementation
- `rn/` — React Native application
- `ios/` — intentionally scoped future iOS extension
- `flutter/` — future Flutter runtime extension

---

## Feature Hub & Integration Validation

The Android host application launches into the **Feature Hub** (`FeatureHubActivity`), a Compose-based feature scheduler displaying active platform capabilities and placeholder feature entries.

Selecting an active feature launches its corresponding host `ReactActivity`, executing the React Native runtime for that **Independent RN Application Boundary**:

```text
FeatureHubActivity (Compose Hub)
     │
     ├── [Intent] Native ↔ RN Bridge
     │      ▼
     │  BridgeActivity -> BridgeRoot ("BridgeRoot") -> BridgeTestScreen
     │      │
     │      │ AppBridge.hello()
     │      ▼
     │  Android Native Module (AppBridgeModule) -> "Android Native OK"
     │
     └── [Intent] RN Watchlist
            ▼
        WatchlistActivity -> WatchlistRoot ("WatchlistRoot") -> WatchlistScreen
```

This flow provides a clear Feature Hub entry while preserving clean RN Application boundaries.

---

## Web3 Direction

The application is being developed around a practical Web3 mobile use case.

The intended feature direction includes:

- Wallet connection
- Authentication and authorization
- Watchlist data
- Realtime monitoring of selected assets
- Profile and session management
- Secure platform interactions
- Blockchain RPC and transaction flows

---

## Current Status

### Implemented

- [x] Android project structure
- [x] Modular Android core boundaries
- [x] Android Feature Hub (`FeatureHubActivity` & `FeatureHubScreen`)
- [x] RN Application Boundaries (`BridgeActivity` & `WatchlistActivity`)
- [x] React Native 0.74.5 Application Setup
- [x] Android Host Application for RN
- [x] RN Page Rendering on Android
- [x] Metro Development Integration
- [x] Legacy RN Bridge Configuration
- [x] RN → Android Native Asynchronous Call
- [x] Android → RN Promise Result
- [x] `AppBridgeModule` Registration and Invocation
- [x] Architecture Baseline Established
- [x] Current Implementation Trunk Established

---

## Development

### Android

Open the `android/` directory in Android Studio.

Build the Android application:

```bash
cd android
./gradlew :app:assembleDebug
```

### React Native

Open the `rn/` directory in your preferred editor.

Install dependencies:

```bash
cd rn
npm install
```

Start the React Native development server:

```bash
npm start
```

Run the Android application from the React Native project:

```bash
npm run android
```

---

## Engineering Principles

The project follows a small set of architectural principles:

- **Responsibility first** — define boundaries according to actual responsibilities.
- **No speculative abstraction** — introduce abstractions when implementation requirements justify them.
- **Explicit boundaries** — keep application, feature, and platform responsibilities clear.
- **Platform independence** — Android and iOS may implement shared semantics differently according to their native environments.
- **Incremental validation** — introduce major capabilities through runnable code and concrete validation.
- **Continuous calibration** — the architecture is an Active Baseline and evolves when implementation evidence demonstrates that the current boundaries need adjustment.
