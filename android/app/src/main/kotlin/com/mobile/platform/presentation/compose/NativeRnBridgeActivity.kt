package com.mobile.platform.presentation.compose

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.react.defaults.DefaultReactActivityDelegate

class NativeRnBridgeActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        ReactFeatureFlags.enableBridgelessArchitecture = false
        super.onCreate(savedInstanceState)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "MobilePlatform"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}
