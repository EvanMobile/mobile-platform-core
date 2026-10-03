package com.mobile.platform.presentation.compose

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.react.defaults.DefaultReactActivityDelegate

class BridgeActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        ReactFeatureFlags.enableBridgelessArchitecture = false
        super.onCreate(savedInstanceState)
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     */
    override fun getMainComponentName(): String = "BridgeRoot"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}
