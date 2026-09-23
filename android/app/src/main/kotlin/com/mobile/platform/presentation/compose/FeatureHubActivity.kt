package com.mobile.platform.presentation.compose

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

class FeatureHubActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FeatureHubScreen(
                onLaunchNativeRnBridge = {
                    startActivity(Intent(this, NativeRnBridgeActivity::class.java))
                }
            )
        }
    }
}
