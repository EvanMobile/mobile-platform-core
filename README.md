# Mobile Platform Core

A **mobile atomized architecture foundation** that strictly separates the **Runnable Application** from **Platform Core** services, ensuring high decoupling and modularity.

## 🚀 Getting Started

### Prerequisites
- **JDK 17**: Required for `web3j` and Java Record support.
- **Android Studio Ladybug (2024.2.1)**+

### Build Configuration
- **Custom Maven**: Hosted at `https://dl.cloudsmith.io/public/consensys/maven/maven/` for `jc-kzg-4844`.
- **JDK Desugaring**: Enabled for modern Java feature support on Min SDK 24.

## 🏗 Project Architecture

```text
mobile-platform-core/
│
├── app/                         ⭐ Runnable Application
│   └── src/main/
│       ├── presentation/        
│       │   ├── compose/         
│       │   ├── reactnative/     
│       │   └── navigation/      
│       ├── di/                  
│       ├── MainActivity.kt      
│       └── MobilePlatformApplication.kt
│
├── core/                        ⭐ Platform Core
│   ├── common/                  
│   ├── state/                   
│   ├── network/                 
│   ├── security/                
│   ├── webview/                 
│   └── web3/                    
│
├── build-logic/                 
├── gradle/                      
└── settings.gradle.kts          
```

## 📂 Module Responsibility

### 1. app/
The host application orchestrating platform modules.
- **presentation/**: Rendering logic (Compose, RN).
- **navigation/**: Cross-engine and internal routing.
- **di/**: Centralized DI configuration.

### 2. core/
Atomic, domain-specific modules.
- **common/**: Shared utilities.
- **state/**: **Single Source of Truth (SSOT)** and Domain Models.
- **network/**: RPC and API communication.
- **security/**: Keystore and biometric services.
- **webview/**: Standardized WebView and JSBridge.
- **web3/**: Blockchain protocol integrations (EVM, Solana).

### 3. Build Logic
- **build-logic/**: Convention Plugins for unified configuration.
- **libs.versions.toml**: Centralized dependency management.

## 📜 Guidelines
1. **Unidirectional Dependency**: `app` -> `core`.
2. **SSOT**: `core:state` manages all business logic.
3. **Engine Agnostic**: Business logic resides in `core`; `app/presentation` acts as a thin consumer.

## 🏷 Git Commit Standard

| Prefix | Description |
| :--- | :--- |
| `feat` | New features or major architecture updates |
| `fix` | Bug fixes |
| `docs` | Documentation changes |
| `style` | Formatting changes (no logic impact) |
| `refactor` | Code refactoring |
| `build` | Build system or dependency updates |
| `chore` | Maintenance and cleanup |
