plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.jetbrains.kotlin.android)
}

android {
    namespace = "com.mobile.platform.core.services.web3"
    compileSdk = 34

    defaultConfig {
        minSdk = 24
    }
}

dependencies {
    implementation(project(":core:state"))
    implementation(libs.web3j.core)
    implementation(libs.androidx.core-ktx)
}
