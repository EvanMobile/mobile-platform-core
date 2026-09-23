# PROJECT_SNAPSHOT.md

## 1. 项目状态 (Project Status)

- **项目名称**: `mobile-platform-core`
- **当前分支**: `main`
- **当前 HEAD**: `4a133a1` — `docs: evolve architecture baseline for platform extensions`
- **当前实现主干 (Current Implementation Trunk)**:
  - React Native Application
  - Android Platform Core (Feature Hub + Native Platform Capabilities)
- **仓库状态**: 当前仓库已经形成 RN + Android 的实际实现主干。iOS 和 Flutter 目前仅保留仓库级占位目录，暂不属于当前实现范围。
- **架构状态**: Architecture Baseline 已建立，并随着实际实现持续校准。
- **Web3 功能状态**: 当前尚未实现完整的 Web3 产品功能。
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
│   │           │       └── NativeRnBridgeActivity.kt
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
├── rn/                              # React Native Application
│   ├── src/
│   │   └── App.tsx
│   ├── index.js
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
│   │   └── 001-native-feature-hub.md
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

主要负责：

- Application UI
- Application-level interaction
- Product / business flows
- Web3 application experience
- 通过 Platform API 使用必要的 native-only capabilities

RN 不直接承担 Android wallet protocol、Android security primitive、secure storage 等平台特定实现。

### Native Platform

Android 当前承担 Native Platform Layer，并通过 Compose Feature Hub (`FeatureHubActivity`) 提供入口与调度能力。

平台侧承载：

- Feature Hub (`FeatureHubActivity`)
- Native ↔ RN Bridge Entry (`NativeRnBridgeActivity`)
- Secure Storage 与 Android Security primitives
- Biometric authentication
- Wallet protocol integration
- WebView / JSBridge
- 必要的 native networking / RPC infrastructure
- 其他平台特定能力

这些能力在需要跨越平台边界时，通过明确的 **Platform API** 暴露给 Application Layer。

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

## 5. Android Core Modules

| Module | 当前状态 | 预期职责 |
|---|---|---|
| `:core:common` | Skeleton | Shared foundational types / utilities |
| `:core:state` | Skeleton | Application / platform state infrastructure |
| `:core:network` | Skeleton | Network / RPC-related infrastructure |
| `:core:security` | Skeleton | Security / secure platform primitives |
| `:core:web3` | Skeleton | Web3 protocol / blockchain integration |
| `:core:webview` | Skeleton | WebView / related native integration |

---

## 6. React Native Integration

Android 当前作为 React Native Application 的 Host。

### RN Entry

```text id="7ap4j8"
rn/index.js
    ↓
AppRegistry.registerComponent(...)
    ↓
rn/src/App.tsx
```

### Android Host

```text id="2k3x6n"
FeatureHubActivity (Compose Hub)
    ↓
NativeRnBridgeActivity (ReactActivity)
    ↓
MobilePlatformApplication
    ↓
React Native Runtime
```

---

## 7. RN ↔ Android Native Integration

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
NativeRnBridgeActivity
      ↓
rn/src/App.tsx
      ↓
AppBridge.hello()
      ↓
"Android Native OK"
```

---

## 8. Web3 依赖与实现状态 (Web3 Status)

### EVM
- `web3j-core: 4.11.0` 已声明

### Solana
- `solana-mwa: 2.0.0` 已声明

---

## 9. 已实现功能 (Implemented)

### 已确认

- [x] Android Multi-module Project Structure
- [x] Feature Hub Entry (`FeatureHubActivity` & `FeatureHubScreen`)
- [x] Native ↔ RN Bridge Feature Entry (`NativeRnBridgeActivity`)
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

**Last verified:** 2026-09-24  
**Architecture status:** Active Baseline Established