// Top-level build file where you can add configuration options common to all sub-projects/modules.
extra["compileSdkVersion"] = 34
extra["minSdkVersion"] = 24
extra["targetSdkVersion"] = 34
extra["REACT_NATIVE_NODE_MODULES_DIR"] = "$rootDir/../rn/node_modules/react-native"

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.jetbrains.kotlin.android) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.react.native) apply false
}
