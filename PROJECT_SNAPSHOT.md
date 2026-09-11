# PROJECT_SNAPSHOT.md

## 1. 项目概览 (Project Overview)
*   **项目名称**: mobile-platform-core
*   **当前分支**: main
*   **最近 Commit**: `4c1e376619c407bf12466e146e7de2484551dea7` - Evan, 24 hours ago : docs: synchronize README with current project structure
*   **Git 状态**: Working tree clean (无未提交的改动)
*   **开发阶段**: Stage 1 - 基础集成已完成，React Native 页面可在 Android 中正常渲染。
*   **下一步目标**: 实现最小 RN → Android Native → RN 通信闭环。

## 2. 技术栈与版本 (Technology Stack & Versions)
*   **Android**:
    *   **Android Gradle Plugin (AGP)**: 8.4.2 (CONFIRMED)
    *   **Gradle**: 8.8 (CONFIRMED)
    *   **Kotlin**: 1.9.24 (CONFIRMED)
    *   **JDK**: 17 (CONFIRMED)
    *   **SDK**: compileSdk 34, targetSdk 34, minSdk 24 (CONFIRMED)
    *   **Jetpack Compose**: Enabled (BOM 2024.08.00)
*   **React Native**:
    *   **Version**: 0.74.5 (CONFIRMED)
    *   **Architecture**: Legacy Bridge (New Arch/Bridgeless: false)
    *   **Hermes**: Enabled
*   **iOS**: 仅存目录骨架 (README.md)，未启动集成 (CONFIRMED)。
*   **Flutter**: 仅存目录骨架 (README.md)，未启动集成 (CONFIRMED)。

## 3. 目录结构 (Directory Structure)
```text
mobile-platform-core/
├── android/                 # Android Native 项目根目录
│   ├── app/                 # 主工程模块 (RN 宿主)
│   │   └── src/main/kotlin/com/mobile/platform/
│   │       ├── MainActivity.kt
│   │       └── MobilePlatformApplication.kt
│   ├── core/                # 原子化核心业务组件 (Library)
│   │   ├── common/
│   │   ├── network/
│   │   ├── security/
│   │   ├── state/
│   │   ├── web3/
│   │   └── webview/
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── gradle/libs.versions.toml
├── rn/                      # React Native 项目源码
│   ├── src/
│   │   └── App.tsx          # RN 页面主入口 (负责 UI 逻辑渲染)
│   ├── index.js             # RN 启动脚本 (注册 App 根组件)
│   └── package.json         # RN 依赖与配置
├── ios/                     # iOS 项目目录 (仅骨架)
└── flutter/                 # Flutter 项目目录 (仅骨架)
```

## 4. 关键配置与集成状态 (Key Configurations)
*   **RN Integration**:
    *   `android/app/build.gradle.kts` 已配置 `com.facebook.react` 插件，指向 `../../rn`。
    *   `MobilePlatformApplication.kt` 实现了 `ReactApplication` 接口。
    *   `MainActivity.kt` 继承自 `ReactActivity`，加载 `"MobilePlatform"` 组件。
*   **Entry Points**:
    *   **JS 入口**: `rn/index.js` 调用 `AppRegistry.registerComponent`。
    *   **Android 入口**: `com.mobile.platform.MainActivity`。
*   **Dependencies**:
    *   Android 侧已引入 `web3j:4.11.0` 和 `solana-mwa:2.0.0` (仅依赖声明)。
    *   RN 侧核心依赖 `react: 18.2.0`, `react-native: 0.74.5`。

## 5. 当前能力与已确认功能 (Current Capabilities)
*   [x] Android App 基础架构 (Multi-module) 搭建。
*   [x] React Native 环境与 Metro 正常运行。
*   [x] Android 端成功承载并渲染 RN 页面 (`App.tsx`)。
*   [ ] RN 与 Native 的双向通信 (Native Modules) - **待处理**。
*   [ ] Web3/MWA 功能实现 - **待处理**。

## 6. 重要模块说明 (Important Modules)
*   **`:app`**: 宿主模块，管理 RN 引擎生命周期及原生页面跳转。
*   **`:core:web3`**: 预留区块链协议处理能力。
*   **`rn/src/App.tsx`**: 当前 RN 侧唯一的业务视图组件。

## 7. 未确认事项 (Unconfirmed)
*   iOS 侧的工程配置 (Xcode project/workspace) 尚未初始化。
*   Flutter 侧的具体集成路线 (Add-to-app 或其它) 尚未明确。

Last verified: 2026-09-12 05:05 (GMT+8)
