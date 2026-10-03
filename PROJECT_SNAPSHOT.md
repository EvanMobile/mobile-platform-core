# PROJECT_SNAPSHOT.md

## 1. 项目状态 (Project Status)

- **项目名称**: `mobile-platform-core`
- **当前分支**: `main`
- **当前 HEAD**: `4a133a1` — `docs: evolve architecture baseline for platform extensions`
- **当前实现主干 (Current Implementation Trunk)**:
  - React Native Application (Independent RN Application Boundaries)
  - Android Platform Core (Feature Hub + Native Platform Capabilities)
- **仓库状态**: 当前仓库已经形成 RN + Android 的实际实现主干。iOS 和 Flutter 目前仅保留仓库级占位目录，暂不属于当前实现范围。
- **架构状态**: Architecture Baseline 已建立，并随着实际实现持续校准。
- **Web3 功能状态**: 当前已完成 Card #001 (Native Bridge Capability) 与 Card #002 (RN Watchlist Application)。
- **文档定位**: 本文件用于记录当前工程状态，帮助在不同开发阶段恢复项目上下文。源代码和 Git 历史仍然是最终事实依据；本文件属于随工程状态变化而更新的 Snapshot。

---

## 2. 仓库结构 (Repository Structure)

```text id="8x0kq2"
mobile-platform-core/
├── android/                         # Android Platform
│   ├── app/                         # Android Application Host
│   │   └── src/main/kotlin/
│   │       └── com/mobile/platform/
│   │           ├── bridge/          # RN ↔ Android Integration
│   │           │   ├── AppBridgeModule.kt
│   │           │   └── AppBridgePackage.kt
│   │           ├── presentation/
│   │           │   └── compose/     # Feature Hub & Presentation
│   │           │       ├── FeatureHubActivity.kt
│   │           │       ├── FeatureHubScreen.kt
│   │           │       ├── BridgeActivity.kt
│   │           │       └── WatchlistActivity.kt
│   │           └── MobilePlatformApplication.kt
│   ├── core/                        # Android Platform Core Modules
│   │   ├── common/
│   │   ├── network/
│   │   ├── security/
│   │   ├── state/
│   │   ├── web3/
│   │   └── webview/
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── gradle/
│       └── libs.versions.toml
│
├── rn/                              # React Native Application Layer
│   ├── src/
│   │   ├── bridge/                  # Card #001 Bridge Application Boundary
│   │   │   ├── BridgeRoot.tsx
│   │   │   ├── BridgeApp.tsx
│   │   │   ├── navigation/
│   │   │   └── screens/
│   │   └── watchlist/               # Card #002 Watchlist Application Boundary
│   │       ├── WatchlistRoot.tsx
│   │       ├── WatchlistApp.tsx
│   │       ├── navigation/
│   │       ├── screens/
│   │       ├── components/
│   │       ├── data/
│   │       ├── hooks/
│   │       └── model/
│   ├── index.js                     # AppRegistry component registrations
│   └── package.json
│
├── ios/                             # Repository-level iOS Placeholder
│   └── README.md
│
├── flutter/                         # Repository-level Flutter Placeholder
│   └── README.md
│
├── docs/
│   ├── feature-cards/
│   │   ├── 001-native-feature-hub.md
│   │   └── 002-rn-watchlist.md
│   └── architecture-baseline.md
│
├── PROJECT_SNAPSHOT.md              # Current Engineering State
└── README.md                        # Public Project Overview
```

---

## 3. 当前架构上下文 (Architecture Context)

当前架构明确区分 **Application Layer** 与 **Platform Layer**。

```text id="f6wz4p"
┌──────────────────────────────────────────────┐
│              React Native Application        │
│                                              │
│  UI / Application Logic / Product Features   │
└──────────────────────┬───────────────────────┘
                       │
                 Platform API
                       │
┌──────────────────────▼───────────────────────┐
│             Native Platform Core             │
│                                              │
│  Security / Secure Storage / Wallet /        │
│  WebView / Native Networking / Platform APIs │
└──────────────────────────────────────────────┘
```

### React Native Application

RN 当前承担 Application Layer。

每个独立功能/应用入口通过 **Independent RN Application Boundary** 暴露给 Native Host：

- `BridgeRoot`: Card #001 Bridge capability validation application.
- `WatchlistRoot`: Card #002 Watchlist feature application.

每个 RN Application 在其 Boundary 内拥有完整的组成结构（Root Component -> App Composition -> Navigation / Router -> Screens）。

### Native Platform

Android 当前承担 Native Platform Layer，并通过 Compose Feature Hub (`FeatureHubActivity`) 提供入口与调度能力。

平台侧承载：

- Feature Hub (`FeatureHubActivity`)
- Bridge Application Host (`BridgeActivity`)
- Watchlist Application Host (`WatchlistActivity`)
- Secure Storage 与 Android Security primitives
- Biometric authentication
- Wallet protocol integration
- WebView / JSBridge

---

## 4. 技术栈与版本 (Technology Stack)

### Android

| Component | Version / Configuration | 状态 |
|---|---|---|
| Android Gradle Plugin | 8.4.2 | 已确认 |
| Gradle | 8.8 | 已确认 |
| Kotlin | 1.9.24 | 已确认 |
| JDK | 17 | 已确认 |
| compileSdk | 34 | 已确认 |
| targetSdk | 34 | 已确认 |
| minSdk | 24 | 已确认 |
| Jetpack Compose | BOM 2024.08.00 | 已配置 |

### React Native

| Component | Version / Configuration | 状态 |
|---|---|---|
| React | 18.2.0 | 已确认 |
| React Native | 0.74.5 | 已确认 |
| Architecture | Legacy Bridge | 已确认 |
| New Architecture | Disabled | 已确认 |
| Bridgeless | Disabled | 已确认 |
| Hermes | Enabled | 已确认 |
| Metro | Development Runtime 所需 | 已确认 |

---

## 5. React Native Integration

Android 当前作为 React Native Application 的 Host。

### RN Entry

```text id="7ap4j8"
rn/index.js
    ├── AppRegistry.registerComponent('BridgeRoot', () => BridgeRoot)
    └── AppRegistry.registerComponent('WatchlistRoot', () => WatchlistRoot)
```

### Android Host

```text id="2k3x6n"
FeatureHubActivity (Compose Hub)
    ├── [Intent] -> BridgeActivity -> "BridgeRoot" -> BridgeRoot.tsx
    └── [Intent] -> WatchlistActivity -> "WatchlistRoot" -> WatchlistRoot.tsx
```

---

## 6. RN ↔ Android Native Integration

### Native Module

```text id="r5j2mv"
AppBridgeModule.kt
```

提供：

```text id="s9x4kc"
AppBridge.hello()
```

该方法通过 Promise 异步返回：

```text id="u3n7wd"
Android Native OK
```

### Flow

```text
FeatureHubActivity
      ↓ (Intent)
BridgeActivity ("BridgeRoot")
      ↓
rn/src/bridge/screens/BridgeTestScreen.tsx
      ↓
AppBridge.hello()
      ↓
"Android Native OK"
```

---

## 7. 已实现功能 (Implemented)

### 已确认

- [x] Android Multi-module Project Structure
- [x] Feature Hub Entry (`FeatureHubActivity` & `FeatureHubScreen`)
- [x] RN Application Boundaries (`BridgeActivity` -> `"BridgeRoot"` & `WatchlistActivity` -> `"WatchlistRoot"`)
- [x] React Native 0.74.5 Application Setup
- [x] Android Host Application for RN
- [x] RN Page Rendering on Android
- [x] Metro Development Integration
- [x] Legacy RN Bridge Configuration
- [x] RN → Android Native Asynchronous Call
- [x] Android → RN Promise Result
- [x] `AppBridgeModule` Registration and Invocation
- [x] Card #002 RN Watchlist Feature Application
- [x] Architecture Baseline Established
- [x] Current Implementation Trunk Established

---

**Last verified:** 2026-10-04  
**Architecture status:** Active Baseline Established
