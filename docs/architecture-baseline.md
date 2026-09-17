# Architecture Baseline

- **Status**: Active Baseline
- **Scope**: Current Architecture Direction
- **Purpose**: Architecture reference for subsequent implementation and review

## 1. Core Philosophy

The `mobile-platform-core` project is designed as a production-oriented foundation that integrates **Native Platform Engineering**, **Cross-platform Application Development**, and **Web3 Components**. 

Instead of treating the mobile platforms as mere shells for a cross-platform UI, this architecture respects the unique responsibilities of each layer to achieve high-quality engineering standards.

### 1.1 Native Platform (Android / iOS)
The Native sides serve as the **Platform Foundation** and provide **Platform Capabilities**.
- **Responsibilities**: Native-specific networking capabilities, Security (Keystore, Biometrics), Secure Storage, WebView engine, Wallet protocol integration (e.g., Solana MWA), and other OS-specific runtimes.
- **Pure Responsibility**: Native platforms do **not** host product business UI or primary dApp business logic.
- **Independence**: Android and iOS are independent platforms. Shared semantics (e.g., "Security") do not imply shared implementation.

### 1.2 RN Application
React Native is the primary **Application Layer**.
- **Role**: RN is the true Application, not just a presentation/UI layer.
- **Responsibilities**: Product business logic, UI/UX, Navigation, Application State management, Application-level Networking (REST, WebSocket, RPC), and Web3 application composition.
- **Direct Interaction**: RN can directly communicate with backends or RPC nodes without being forced through a Native proxy unless a native-only capability is required.

---

## 2. Structural Vision

### 2.1 Repository Map
```text
MOBILE PLATFORM CORE
│
├── Native Platforms
│   ├── android/
│   │   └── Platform Capabilities (Network, Security, MWA, etc.)
│   │
│   └── ios/
│       └── Platform Capabilities
│
├── Applications
│   └── rn/
│       ├── app/        # App entry and global setup
│       ├── domain/     # Business domain concepts, introduced only when justified
│       ├── features/   # Feature-oriented business organization
│       ├── state/           # Application state management
│       └── network/         # Application-level networking
│
└── docs/               # Architecture and project documentation
```

### 2.2 RN Application Internal Structure
The `rn/src/features/` directory is used for **business organization**, not as a technical architectural layer.
```text
RN Application
│
├── Presentation / UI   # Components, Themes, Layouts
├── Features            # Business functions (wallet, auth, watchlist, profile)
├── Domain              # Business concepts introduced only when actual application requirements justify them.
├── State               # Application State (Zustand, Redux, etc.)
├── Application Network # API Clients (Axios, Fetch, Web3.js, Ethers)
│
└── Platform API (Bridge)
        │
        ├── Android Platform Capability
        └── iOS Platform Capability
```

---

## 3. Web3 Context

- **Wallet vs. Chain**: 
    - **Wallet**: Responsible for user interaction, connection, authorization, and signing.
    - **Chain**: Responsible for blockchain network data, RPC interaction, and transaction broadcasting.
- **Integration**: 
    - **MWA (Solana Mobile Wallet Adapter)**: A native protocol integration within the Native Platform.
    - **web3j / ethers / web3.js**: Blockchain interaction libraries used primarily within the Application (RN) layer.

---

## 4. Platform API (The Bridge)

The Platform API exists solely to allow the RN Application to consume **Native-only capabilities**.
- **Typical Use Cases**: Wallet signing (MWA), Biometric Auth, Platform Secure Storage, Native WebView logic.
- **Constraint**: It is **not** a mandatory gateway for all network traffic or general business logic.

---

## 5. Architecture Evolution

This structure is a **Frozen Baseline**, serving as the starting point for implementation. While evolution is permitted, it must follow these principles:

1. **Responsibility First**: Understand the actual responsibility before defining a boundary or directory.
2. **No Speculative Abstraction**: Do not create directories or interfaces just because they exist in "Standard Clean Architecture" templates. Abstraction must be driven by actual duplication or clear responsibility needs.
3. **Human Authority**: AI-generated architecture and code must be reviewed and understood by the human engineer. The human engineer must be able to explain every boundary and design trade-off.
4. **Consistency**: When implementation reveals that the baseline no longer matches actual responsibilities, the architecture must be explicitly reviewed and the baseline updated before the new direction becomes established.

## 6. Engineering Goals

- **Android**: Practice modern engineering with Kotlin, Coroutines, Flow, and Native capability integration.
- **iOS**: Practice Swift, SwiftUI, Xcode environment, and native platform capabilities.
- **React Native**: Practice TypeScript, Hooks, State management, Hermes runtime, and Web3 integration.
- **Engineering Mindset**: Prioritize architectural clarity and "real-world engineering thinking" over raw code volume.
