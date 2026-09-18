# PROJECT_SNAPSHOT.md

## 1. 项目状态 (Project Status)

- **项目名称**: `mobile-platform-core`
- **当前分支**: `main`
- **当前 HEAD**: `4a133a1` — `docs: evolve architecture baseline for platform extensions`
- **当前实现主干 (Current Implementation Trunk)**:
  - React Native Application
  - Android Platform Core
- **仓库状态**: 当前仓库已经形成 RN + Android 的实际实现主干。iOS 和 Flutter 目前仅保留仓库级占位目录，暂不属于当前实现范围。
- **架构状态**: Architecture Baseline 已建立，并随着实际实现持续校准。
- **Web3 功能状态**: 当前尚未实现完整的 Web3 产品功能。
- **文档定位**: 本文件用于记录当前工程状态，帮助在不同开发阶段恢复项目上下文。源代码和 Git 历史仍然是最终事实依据；本文件属于随工程状态变化而更新的 Snapshot。

---

## 2. 仓库结构 (Repository Structure)

```text id="8x0kq2"
mobile-platform-core/
├── android/                         # Android Platform
│   ├── app/                         # Android RN Host Application
│   │   └── src/main/kotlin/
│   │       └── com/mobile/platform/
│   │           ├── bridge/          # RN ↔ Android Integration
│   │           │   ├── AppBridgeModule.kt
│   │           │   └── AppBridgePackage.kt
│   │           ├── MainActivity.kt
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
├── Architecture Baseline            # Architecture Reference
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

Android 当前承担 Native Platform Layer。

平台侧可能承载：

- Secure Storage 与 Android Security primitives
- Biometric authentication
- Wallet protocol integration
- WebView / JSBridge
- 必要的 native networking / RPC infrastructure
- 其他平台特定能力

这些能力在需要跨越平台边界时，通过明确的 **Platform API** 暴露给 Application Layer。

### 架构演进

Architecture Baseline 是一个 **Active Baseline**，不是 Frozen Design。

当前工程采用：

```text id="4l1j7r"
Audit → Decision → Card → Construction → Calibration
```

随着真实实现推进，架构边界可以根据工程证据持续校准。

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

### 其他平台

- **iOS**：目前仅有 repository-level placeholder，尚未初始化 Xcode project / workspace。
- **Flutter**：目前仅有 repository-level placeholder，尚未初始化 Flutter integration。

iOS 和 Flutter 当前未实现并非遗漏，而是当前实现范围的主动控制。

---

## 5. Android Core Modules

当前 Android 项目包含以下 Core Modules：

| Module | 当前状态 | 预期职责 |
|---|---|---|
| `:core:common` | Skeleton | Shared foundational types / utilities |
| `:core:state` | Skeleton | Application / platform state infrastructure |
| `:core:network` | Skeleton | Network / RPC-related infrastructure |
| `:core:security` | Skeleton | Security / secure platform primitives |
| `:core:web3` | Skeleton | Web3 protocol / blockchain integration |
| `:core:webview` | Skeleton | WebView / related native integration |

目前这些模块主要承担**结构与边界占位**，尚未形成完整的 production feature implementation。

因此，模块目录的存在不代表对应能力已经完成；后续实现应以实际代码、接口和依赖关系为准。

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
MainActivity
    ↓
ReactActivity
    ↓
MobilePlatformApplication
    ↓
React Native Runtime
```

Android 工程通过 React Native Gradle integration 指向仓库根目录下的：

```text id="h8v1qa"
../../rn
```

---

## 7. RN ↔ Android Native Integration

当前已经完成并验证最小的 Legacy Bridge 通信闭环。

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

### Registration

```text id="n6p2zr"
AppBridgeModule
        ↓
AppBridgePackage
        ↓
MobilePlatformApplication
```

### RN Consumption

`rn/src/App.tsx` 调用：

```text id="e4k8hs"
NativeModules.AppBridge.hello()
```

并显示 Native 返回结果。

这一闭环的意义是验证：

```text
RN Application
      ↓
Legacy Bridge
      ↓
Android Native
      ↓
Promise Result
      ↓
RN Application
```

它属于 **RN ↔ Android Native Integration Validation**，不是 Web3 产品功能。

---

## 8. Web3 依赖与实现状态 (Web3 Status)

当前仓库已经为 EVM 与 Solana 方向预留依赖，但尚未进入实际 Web3 feature implementation。

### EVM

当前 `:core:web3` 声明：

```text id="w2m7pd"
web3j-core: 4.11.0
```

目前状态：

- dependency declaration 已存在
- 尚无 Wallet feature implementation
- 尚无 transaction / signing flow
- 尚无完整 RPC / application integration

### Solana

当前声明：

```text id="q8f3xt"
solana-mwa: 2.0.0
```

版本信息位于：

```text id="c5n1yr"
android/gradle/libs.versions.toml
```

目前状态：

- version declaration 已存在
- 尚未完成 module integration
- 尚无 wallet connection flow
- 尚无 signing flow
- 尚无 production MWA implementation

因此，MWA 当前属于**已声明的计划集成依赖**，还不能视为已经实现的 platform capability。

---

## 9. Wallet 与 Chain 边界

当前 Web3 方向明确区分 **Wallet** 与 **Chain**。

```text id="v7c2mk"
Wallet
├── Connection
├── Authorization
├── Signing
└── User-controlled wallet interaction

Chain
├── Blockchain data
├── RPC
├── Transaction construction
└── Transaction broadcasting
```

两者并不是同一个抽象。

Wallet 主要处理用户控制的钱包交互、授权与签名；Chain 主要处理区块链数据、RPC 以及交易相关能力。

后续具体实现中，平台相关的 Wallet Protocol 可能需要由 Native Platform 承载，而 Chain-facing application behavior 则根据实际边界通过 Application Layer 或 Platform API 提供。

---

## 10. 已实现功能 (Implemented)

### 已确认

- [x] Android Multi-module Project Structure
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

### 尚未实现

- [ ] Wallet Connection
- [ ] Solana MWA Integration
- [ ] EVM Wallet Integration
- [ ] Wallet Authorization / Signing Flows
- [ ] Blockchain RPC Integration
- [ ] Transaction Flows
- [ ] Secure Storage Implementation
- [ ] Biometric Authentication Implementation
- [ ] WebView / JSBridge Product Integration
- [ ] Watchlist Data Flow
- [ ] Realtime Asset Monitoring
- [ ] Profile / Session Flows
- [ ] iOS Platform Implementation
- [ ] Flutter Integration

---

## 11. 当前实现范围 (Current Scope)

当前工程实现集中在：

```text id="a4q6yk"
React Native Application
            +
Android Platform Core
```

当前重点不是为了追求多平台对称，而是围绕真实的 Web3 / Mobile requirements，继续验证和深化已经建立的 Application / Platform boundary。

后续实现将逐步进入：

- Wallet integration
- Chain / RPC integration
- Security / secure storage
- Application state
- Web3 application flows
- Platform API boundaries

这些内容会随着实际 construction 逐步确定，而不是在当前阶段一次性预设完整实现。

iOS 和 Flutter 暂时作为 extension targets，不属于当前 implementation requirements。

---

## 12. 已知限制 (Known Limitations)

- Android 是目前唯一已经形成实际 Native implementation 的平台。
- RN 当前使用 Legacy Bridge，尚未迁移到 New Architecture。
- Android Core Modules 目前仍以 Skeleton-level implementation 为主。
- Web3 dependencies 已存在，但 Web3 product functionality 尚未实现。
- Solana MWA 已声明，但尚未完成 integration。
- 当前尚不存在完整的 Wallet abstraction / Wallet Provider implementation。
- 当前尚不存在完整的 RPC / blockchain data layer。
- 当前尚不存在 production-level Secure Storage / Biometric flow。
- iOS 和 Flutter 当前仅为 repository-level placeholders。

---

## 13. Engineering Record

本文件用于保存当前工程上下文，便于在不同开发阶段快速恢复状态。

它主要记录：

- 当前已经存在的工程结构
- 已经验证的能力
- 尚未实现的能力
- 当前架构边界
- 当前 implementation scope

它不替代：

- Source Code
- Git History
- README
- Architecture Baseline

当实际工程状态发生变化时，应在相应工程 checkpoint 更新本 Snapshot。

---

**Last verified:** 2026-09-19  
**Repository HEAD at verification:** `4a133a1`  
**Architecture status:** Active Baseline Established