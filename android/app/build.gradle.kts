plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)
    id("com.facebook.react")
}

android {
    namespace = "com.mobile.platform"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.mobile.platform"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
        isCoreLibraryDesugaringEnabled = true
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }

    react {
        /* Folders */
        //   The root of your project, i.e. where "package.json" lives. Default is '..'
        root = file("../../rn")
        //   The folder where the react-native package is. Default is ../node_modules/react-native
        reactNativeDir = file("../../rn/node_modules/react-native")
        //   The folder where the react-native Codegen package is. Default is ../node_modules/@react-native/codegen
        codegenDir = file("../../rn/node_modules/@react-native/codegen")
        //   The cli.js file which is the entry point of react-native CLI. Default is ../node_modules/react-native/cli.js
        cliFile = file("../../rn/node_modules/react-native/cli.js")
    }
    packaging {
        jniLibs {
            useLegacyPackaging = true
        }
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
            excludes += "META-INF/DISCLAIMER"
        }
    }
}

dependencies {
    implementation(libs.react.native)
    implementation(libs.hermes.engine)
    coreLibraryDesugaring(libs.desugar.jdk.libs)
    implementation(project(":core:common"))
    implementation(project(":core:state"))
    implementation(project(":core:network"))
    implementation(project(":core:security"))
    implementation(project(":core:webview"))
    implementation(project(":core:web3"))

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
}
