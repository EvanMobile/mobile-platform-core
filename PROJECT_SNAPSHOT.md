# Project Snapshot

## 1. Project Identity

* **Project name**: mobile-platform-core
* **Root directory**: `/Users/l719/AndroidStudioProjects/mobile-platform-core`
* **Android application/module name**: `:app`
* **Current branch**: `main`
* **Latest commit**: `a0d6330 doc : README.md update`
* **Snapshot generated date**: 2026-09-09T18:01:57+08:00
* **Overall project purpose**: A mobile atomized architecture foundation designed to separate the Runnable Application from Platform Core services (common, state, network, security, webview, web3).

---

## 2. Technology Stack

* **Android Gradle Plugin**: 8.13.2 (CONFIRMED)
* **Gradle**: 8.13 (CONFIRMED)
* **Kotlin**: 1.9.24 (CONFIRMED)
* **Java**: 17 (CONFIRMED)
* **Android SDK**: compileSdk 34, minSdk 24, targetSdk 34 (CONFIRMED)
* **Compose**: 2024.08.00 (CONFIRMED, enabled in `:app`)
* **React Native**: 0.74.5 (CONFIRMED - Stage 1 Loop Established)
* **Coroutines**: NOT_FOUND (No `suspend`, `Flow`, or scopes found in code)
* **Serialization**: NOT_FOUND
* **Networking libraries**: NOT_FOUND (Only module skeleton exists)
* **WebView**: NOT_FOUND (Only module skeleton exists)
* **Web3 / blockchain libraries**: `web3j:4.11.0`, `solana-mwa:2.0.0` (CONFIRMED in dependencies; implementation NOT_FOUND)
* **Testing framework**: JUnit 4.13.2, Espresso 3.6.1 (CONFIRMED in dependencies; no test files found)
* **Dependency management方式**: Version Catalog (`libs.versions.toml`) (CONFIRMED)

---

## 3. Repository Structure

```text
mobile-platform-core/
├── app/                         # Main application module
│   └── src/main/
│       ├── kotlin/com/mobile/platform/
│       │   ├── di/              # DI structure (empty)
│       │   ├── presentation/    # UI structure (empty)
│       │   ├── MainActivity.kt
│       │   └── MobilePlatformApplication.kt
│       └── AndroidManifest.xml
├── core/                        # Platform Core modules
│   ├── common/                  # Skeleton
│   ├── network/                 # Skeleton
│   ├── security/                # Skeleton
│   ├── state/                   # Skeleton
│   ├── web3/                    # Skeleton
│   └── webview/                 # Skeleton
├── build-logic/                 # Convention plugins (skeleton)
├── gradle/                      
│   └── libs.versions.toml       # Version catalog
├── build.gradle.kts             # Root build script
├── settings.gradle.kts          # Project settings
└── README.md                    # Architecture documentation
```

---

## 4. Module Inventory

| Module | Path | Type | Depends On | Current Status |
| :--- | :--- | :--- | :--- | :--- |
| `:app` | `app/` | ANDROID_APP | `:core:*`, RN | IMPLEMENTED (Stage 1) |
| `:core:common` | `core/common/` | ANDROID_LIBRARY | - | SKELETON |
| `:core:network` | `core/network/` | ANDROID_LIBRARY | - | SKELETON |
| `:core:security` | `core/security/` | ANDROID_LIBRARY | - | SKELETON |
| `:core:state` | `core/state/` | ANDROID_LIBRARY | - | SKELETON |
| `:core:web3` | `core/web3/` | ANDROID_LIBRARY | `:core:state` | SKELETON |
| `:core:webview` | `core/webview/` | ANDROID_LIBRARY | - | SKELETON |

---

## 5. Module Dependency Graph

### Visual Representation
* `app` → `:core:common`
* `app` → `:core:network`
* `app` → `:core:security`
* `app` → `:core:state`
* `app` → `:core:web3`
* `app` → `:core:webview`
* `core:web3` → `:core:state`

### Analysis
* **Reverse Dependencies**: None found.
* **Circular Dependencies**: None found.
* **Base Layer**: `core:common`, `core:state`, `core:network`, `core:security`, `core:webview`.
* **Feature/Application Layer**: `app`, `core:web3` (depends on state).

---

## 6. Application Entry Point

* **Application class**: `com.mobile.platform.MobilePlatformApplication` (`app/src/main/kotlin/com/mobile/platform/MobilePlatformApplication.kt`) - Standard Android Application class.
* **Main Activity**: `com.mobile.platform.MainActivity` (`app/src/main/kotlin/com/mobile/platform/MainActivity.kt`) - Launcher activity.
* **Manifest**: `app/src/main/AndroidManifest.xml`.
* **Launcher Activity**: `MainActivity`.
* **Navigation entry point**: NOT_FOUND (Navigation directory is empty).
* **Compose entry point**: `MainActivity.setContent { ... }`.
* **React Native entry point**: NOT_FOUND.

---

## 7. Module Details

### Module: `:app`
* **Purpose**: Host application orchestrating platform modules and providing the UI layer.
* **Source Files**: `MainActivity.kt`, `MobilePlatformApplication.kt`.
* **Public API**: `MobilePlatformApplication`, `MainActivity`.
* **Dependencies**: All `core` modules, Compose, KTX.
* **Implementation Status**: PARTIAL. Basic scaffold and runnable activity.
* **TODO / Missing Pieces**: DI implementation, Navigation, UI components (Compose/RN).

### Module: `:core:common`
* **Purpose**: Shared utilities.
* **Implementation Status**: SKELETON. No source files found.

### Module: `:core:network`
* **Purpose**: RPC and API communication.
* **Implementation Status**: SKELETON. No source files found.

### Module: `:core:security`
* **Purpose**: Keystore and biometric services.
* **Implementation Status**: SKELETON. No source files found.

### Module: `:core:state`
* **Purpose**: Single Source of Truth (SSOT) and Domain Models.
* **Implementation Status**: SKELETON. No source files found.

### Module: `:core:web3`
* **Purpose**: Blockchain protocol integrations (EVM, Solana).
* **Implementation Status**: SKELETON. Dependencies (`web3j`, `solana-mwa`) declared but no code.

### Module: `:core:webview`
* **Purpose**: Standardized WebView and JSBridge.
* **Implementation Status**: SKELETON. No source files found.

---

## 8. Android Configuration

* **Manifest**: Includes basic Application and MainActivity declaration.
* **Permissions**: None declared in Manifest.
* **applicationId / namespace**: `com.mobile.platform`.
* **build types**: `release` (Minify disabled).
* **product flavors**: None.
* **signing configuration**: Default debug signing.
* **ProGuard / R8**: `proguard-android-optimize.txt` included but minification disabled.
* **resources**: Basic strings and empty themes (`Theme.MobilePlatform`).
* **themes**: Inherits `android:Theme.Material.Light.NoActionBar`.
* **Compose configuration**: Enabled in `:app`, Kotlin compiler extension version `1.5.14`.

---

## 9. React Native Status

* **RN implementation**: **NOT FOUND**
* **Details**: `README.md` mentions `presentation/reactnative`, and the directory exists in `app/src/main/kotlin`, but it only contains a `.gitkeep` file. No `package.json` or JS/TS root found in the project.

---

## 10. Kotlin / Coroutines Status

* **Coroutines usage**: **NOT FOUND**
* **Details**: Grep search for `suspend`, `Flow`, `StateFlow`, `viewModelScope`, and `lifecycleScope` yielded no results in the source code.

---

## 11. Web3 / Crypto Status

* **Web3 SDK**: `web3j` and `solana-mwa` are in Version Catalog and declared in `:core:web3`.
* **Wallets/Keys/Mnemonic/Seed**: NOT_FOUND in code.
* **Signing/Cryptography**: NOT_FOUND in code.
* **EVM/Ethereum/Solana**: NOT_FOUND in code.
* **Status**: Placeholder only.

---

## 12. Networking / State / Storage

* **Networking**: NOT_FOUND (No Retrofit/OkHttp usage in code).
* **State**: NOT_FOUND (No ViewModel or StateFlow usage).
* **Storage**: NOT_FOUND (No Room, DataStore, or SharedPreferences usage).

---

## 13. Testing

* **Unit tests**: **NOT FOUND** (Directories are empty/non-existent).
* **Instrumentation tests**: **NOT FOUND**.
* **Mocking framework**: None configured.

---

## 14. Git State

* **current branch**: `main`
* **working tree**: `clean`
* **staged changes**: None
* **unstaged changes**: None
* **untracked files**: `PROJECT_SNAPSHOT.md` (Self-reference)
* **latest 5 commits**:
    1. `a0d6330 doc : README.md update`
    2. `5374852 feat(init): establish project foundation and runnable app scaffold`
    3. `6b4328e chore: initialize project skeleton and architectural documentation`
    4. `5499ced Initial commit`

---

## 15. Current Implementation Status

* **Working**: Basic runnable Android App with a "Hello Mobile Platform" Compose screen.
* **Partial**: `app` module package structure.
* **Skeleton**: All `core` modules, `build-logic`.
* **Missing**: Everything else (Web3 logic, Networking, State management, DI, UI components).
* **Unknown**: CI/CD pipeline (No evidence found).

---

## 16. Architecture Observations

1. **Strict Atomization (FACT)**: The project follows a strict module-per-domain boundary (network, security, web3, etc.), reflecting the "atomized architecture" mentioned in the README.
2. **Top-Down Dependency (FACT)**: `app` acts as the orchestrator, depending on all `core` modules.
3. **Skeleton State (FACT)**: The project is currently a template/scaffold. Most architectural claims in the README (JSBridge, SSOT, biometric services) are not yet reflected in the code.
4. **Consistency in Configuration (FACT)**: Namespace and package names are consistent across modules (`com.mobile.platform.core.*`).
5. **Modern Tech Base (FACT)**: Using JDK 17, AGP 8.13, and Compose, indicating a forward-looking technical baseline.
6. **Web3 Priority (INFERENCE)**: The inclusion of `web3j` and `solana-mwa` at the start suggests Web3 integration is a primary goal.
7. **Empty Convention Plugins (FACT)**: `build-logic` exists but is empty, suggesting centralized build logic is planned but not implemented.

---

## 17. Suggested Investigation Order

1. **`core:state`**: Implement the Single Source of Truth as it's intended to be the domain core.
2. **`core:web3`**: Verify integration with `web3j` and `solana-mwa` as they are already in the classpath.
3. **`core:network`**: Implement basic RPC/API client logic.
4. **`app/di`**: Establish the Dependency Injection framework (e.g., Hilt/Koin) to wire modules together.
5. **`app/presentation/navigation`**: Setup the navigation engine to handle the planned Compose/RN interoperability.
6. **`core:security`**: Implement Keystore/Biometric abstractions early as they are critical for Web3 apps.
