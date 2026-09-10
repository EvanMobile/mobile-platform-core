pluginManagement {
    includeBuild(file("../rn/node_modules/@react-native/gradle-plugin"))
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://dl.cloudsmith.io/public/consensys/maven/maven/") }
        maven { url = uri("$rootDir/../rn/node_modules/react-native/android") }
        maven { url = uri("$rootDir/../rn/node_modules/hermes-engine/android") }
    }
}

rootProject.name = "mobile-platform-core"

include(":app")
include(":core:common")
include(":core:state")
include(":core:network")
include(":core:security")
include(":core:webview")
include(":core:web3")
