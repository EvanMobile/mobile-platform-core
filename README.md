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

This structure keeps application and platform responsibilities explicit without introducing speculative abstractions.

---

## Android Core

The Android project currently contains the following core modules:

| Module | Responsibility |
|---|---|
| `core:common` | Shared foundational utilities |
| `core:state` | State-related infrastructure |
| `core:network` | Network infrastructure |
| `core:security` | Security-related platform infrastructure |
| `core:web3` | Web3 and blockchain integration |
| `core:webview` | WebView-related infrastructure |
| `app` | Android application entry point |

These modules currently establish responsibility boundaries rather than representing a complete set of implemented product features.

New abstractions and modules are introduced only when actual implementation requirements justify them.

---

## Integration Validation

A minimal React Native → Android native bridge has been implemented to validate the Platform API boundary and the native module integration path.

```text
React Native
     │
     │ AppBridge.hello()
     ▼
Android Native Module
     │
     │ Promise result
     ▼
React Native
```

The current bridge flow is an **integration validation step**, not a product feature.

It establishes a working foundation for subsequent native capabilities without introducing additional architectural structure prematurely.

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

The architecture distinguishes between wallet interaction and blockchain network interaction:

```text
Wallet
├── Connection
├── Authorization
└── Signing

Blockchain / Chain
├── RPC
├── Network Data
└── Transaction Broadcasting
```

Native wallet protocols such as **Solana Mobile Wallet Adapter (MWA)** belong to the native platform integration boundary when their implementation requires native platform capabilities.

Application-level blockchain interaction may remain within the RN Application where appropriate.

---

## Cross-Platform and Runtime Extensions

The current implementation trunk is intentionally focused on **React Native + Android**.

Additional platforms or runtimes are future extensions of the established architecture rather than separate application architectures.

A specific feature may use a different native or cross-platform runtime when there is a concrete responsibility-driven reason to do so.

For example:

```text
RN Application
      │
      │ explicit Feature boundary
      ▼
Feature Runtime
      │
      │ structured Feature result
      ▼
RN Application
```

Such a feature runtime remains isolated to the feature that requires it. It does not become a second owner of the application's product business logic.

The `ios/` and `flutter/` directories are intentionally scoped for future extension. A complete iOS or Flutter platform core is not currently claimed or required by the current project scope.

---

## Current Status

### Implemented

- [x] Android project structure
- [x] Modular Android core boundaries
- [x] Android single-activity application
- [x] Android build and emulator validation
- [x] React Native project
- [x] React Native development environment
- [x] React Native UI running on Android
- [x] RN → Android native bridge validation

### Current Direction

- [ ] Security platform capabilities
- [ ] Application networking
- [ ] Web3 integration
- [ ] Solana Mobile Wallet Adapter integration
- [ ] EVM integration with web3j
- [ ] Wallet connection and authorization flows
- [ ] Watchlist and realtime monitoring
- [ ] Secure session handling
- [ ] Transaction flows

These items will be implemented incrementally through concrete features and validation steps rather than by completing the entire architecture upfront.

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

During development, Metro provides the JavaScript bundle to the React Native runtime.

For release builds, the JavaScript bundle is packaged with the application and Metro is not required as a runtime development server.

---

## Engineering Principles

The project follows a small set of architectural principles:

- **Responsibility first** — define boundaries according to actual responsibilities.
- **No speculative abstraction** — introduce abstractions when implementation requirements justify them.
- **Explicit boundaries** — keep application, feature, and platform responsibilities clear.
- **Platform independence** — Android and iOS may implement shared semantics differently according to their native environments.
- **Incremental validation** — introduce major capabilities through runnable code and concrete validation.
- **Continuous calibration** — the architecture is an Active Baseline and evolves when implementation evidence demonstrates that the current boundaries need adjustment.

The goal is not to implement every platform or abstraction upfront, but to establish a coherent mobile architecture that can be extended without redesigning the application around each new technology.