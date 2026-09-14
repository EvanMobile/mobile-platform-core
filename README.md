# Mobile Platform Core

A modular mobile foundation for building Web3 applications with **native Android capabilities and React Native UI**.

The project is currently focused on establishing a clean, runnable foundation first, then incrementally adding security, networking, Web3, and native wallet integrations.

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

### Why Android and React Native are separated

The repository keeps the **Android native project** and the **React Native project** as separate technical roots while maintaining a single Git repository.

- `android/` — Kotlin/Android native layer
- `rn/` — React Native JavaScript/TypeScript layer
- `ios/` — future iOS integration placeholder
- `flutter/` — future Flutter integration placeholder

This separation keeps native infrastructure and cross-platform UI concerns explicit without prematurely introducing unnecessary abstractions.

## Current Architecture

The Android project is organized into independent core modules:

| Module | Responsibility |
|---|---|
| `core:common` | Shared foundational utilities |
| `core:state` | State-related infrastructure |
| `core:network` | Network infrastructure boundary |
| `core:security` | Mobile security boundary |
| `core:web3` | Web3/blockchain integration boundary |
| `core:webview` | WebView-related infrastructure |
| `app` | Android application entry point |

The core modules currently establish **boundaries rather than complete feature implementations**. Functionality will be added incrementally as the project develops.

## Architecture Boundary

The project strictly separates cross-platform product experience from platform-specific capabilities to prevent duplicated UI implementations and establish clear architectural rules for future development.

### Layer Responsibilities

| React Native / Experience Layer | Native / Platform Layer |
|---|---|
| Wallet UI | Solana Mobile Wallet Adapter |
| Asset and token lists | Android Keystore |
| Transaction history | Biometric authentication |
| Send / Receive UI | Secure storage |
| Network selection UI | Transaction signing |
| Wallet state presentation | Web3j / EVM integration |
| Settings and application flows | RPC and network infrastructure |
| Navigation and design system | Native SDK integrations |
| Loading / error / empty states | Android lifecycle and platform APIs |

* React Native owns product experience and cross-platform UI.
* Native owns platform capabilities, security-sensitive operations, native SDK integrations, and low-level infrastructure.

### Capability Boundary

```text
React Native
     │
     │ Capability API
     ↓
Native Capability Layer
     │
     ├── Wallet
     ├── Security
     ├── Network
     └── Transaction
            │
            ├── MWA
            ├── Web3j
            ├── Secure Storage
            └── RPC
```

* React Native should not directly depend on platform-specific implementations such as MWA, Android Keystore, Web3j, or Android biometric APIs.
* Platform capabilities should be exposed through explicit capability interfaces/contracts.
* RN should depend on capability contracts rather than concrete native implementations.
* A user-facing feature may span both React Native and native layers, but the same UI should not be implemented twice.

### Boundary Rules

* RN owns product UI and cross-platform interaction.
* Native owns platform-specific capabilities and security-sensitive operations.
* Capability APIs define the boundary between RN and native code.
* RN should depend on capability contracts rather than concrete native implementations.
* The same UI should not be implemented independently in both RN and native code.

## React Native Runtime

During development, the React Native side follows this flow:

```text
App.tsx
   ↓
index.js
   ↓
AppRegistry
   ↓
React Native Runtime
   ↓
Metro
   ↓
Android application
   ↓
Emulator
```

`App.tsx` defines the React Native UI.

`index.js` registers the root component through `AppRegistry`.

Metro is the development bundler/server that provides the JavaScript bundle to the React Native runtime during development.

For release builds, the JavaScript bundle is packaged with the application and Metro is not required as a runtime development server.

## Current Status

### Foundation

- [x] Android project structure
- [x] Modular Android core boundaries
- [x] Android single-activity application
- [x] Android build and emulator validation
- [x] React Native project
- [x] React Native development environment
- [x] React Native UI running on Android
- [x] Native ↔ React Native bridge (Legacy)

### In Progress / Planned

- [ ] `core:security` implementation
- [ ] `core:network` implementation
- [ ] `core:web3` implementation
- [ ] Solana Mobile Wallet Adapter integration
- [ ] EVM integration with web3j
- [ ] Wallet connection and transaction flows
- [ ] Security-focused mobile capabilities
- [ ] End-to-end Web3 mobile demonstration

## Development

### Android

Open the `android/` directory in Android Studio.

Build the Android application:

```bash
cd android
./gradlew :app:assembleDebug
```

### React Native

Open the `rn/` directory in VS Code.

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

## Project Direction

The long-term goal is to build a practical **Web3 mobile engineering foundation** around:

```text
Kotlin / Android
      │
      ├── Security
      ├── Network
      ├── Web3
      ├── Wallet Integration
      └── Native Capabilities
              │
              ↓
       Capability API
              │
              ↓
     React Native
     Experience Layer
```

The project deliberately starts with a small, verifiable foundation rather than implementing the entire architecture upfront.

Each major capability should be introduced with runnable code, clear module ownership, and a corresponding validation step.