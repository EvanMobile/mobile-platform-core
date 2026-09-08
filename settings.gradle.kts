pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://dl.cloudsmith.io/public/consensys/maven/maven/") }
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
