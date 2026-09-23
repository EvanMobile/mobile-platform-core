package com.mobile.platform.presentation.compose

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class FeatureItem(
    val id: String,
    val title: String,
    val description: String,
    val isActive: Boolean
)

private val featureItems = listOf(
    FeatureItem(
        id = "bridge",
        title = "Native ↔ RN Bridge",
        description = "Validates Native ↔ React Native bridge communication",
        isActive = true
    ),
    FeatureItem(
        id = "watchlist",
        title = "RN Watchlist",
        description = "Asset watchlist and tracking features",
        isActive = false
    ),
    FeatureItem(
        id = "biometric",
        title = "Biometric",
        description = "Native biometric authentication primitive",
        isActive = false
    ),
    FeatureItem(
        id = "secure_storage",
        title = "Secure Storage",
        description = "Encrypted storage backed by Android Keystore",
        isActive = false
    ),
    FeatureItem(
        id = "webview",
        title = "WebView",
        description = "Native isolated WebView integration",
        isActive = false
    ),
    FeatureItem(
        id = "web3_wallet",
        title = "Web3 Wallet",
        description = "Wallet connection and signing protocol",
        isActive = false
    ),
    FeatureItem(
        id = "realtime_monitor",
        title = "Realtime Monitor",
        description = "Realtime network and asset monitoring",
        isActive = false
    )
)

private val HubDarkColorScheme = darkColorScheme(
    background = Color(0xFF0D1117),
    surface = Color(0xFF161B22),
    onBackground = Color(0xFFF0F6FC),
    onSurface = Color(0xFFC9D1D9),
    outline = Color(0xFF30363D)
)

@Composable
fun FeatureHubScreen(
    onLaunchNativeRnBridge: () -> Unit
) {
    MaterialTheme(colorScheme = HubDarkColorScheme) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 20.dp)
            ) {
                Spacer(modifier = Modifier.height(48.dp))

                Text(
                    text = "Mobile Platform",
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onBackground
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Feature Hub",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFF8B949E)
                )

                Spacer(modifier = Modifier.height(24.dp))

                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    contentPadding = PaddingValues(bottom = 32.dp)
                ) {
                    items(featureItems, key = { it.id }) { item ->
                        FeatureCardItem(
                            item = item,
                            onClick = {
                                if (item.isActive && item.id == "bridge") {
                                    onLaunchNativeRnBridge()
                                }
                            }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun FeatureCardItem(
    item: FeatureItem,
    onClick: () -> Unit
) {
    val cardModifier = if (item.isActive) {
        Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    } else {
        Modifier.fillMaxWidth()
    }

    Card(
        modifier = cardModifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = item.title,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onBackground
                )

                StatusBadge(isActive = item.isActive)
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = item.description,
                fontSize = 13.sp,
                color = Color(0xFF8B949E)
            )
        }
    }
}

@Composable
private fun StatusBadge(isActive: Boolean) {
    val backgroundColor = if (isActive) Color(0xFF238636) else Color(0xFF21262D)
    val textColor = if (isActive) Color(0xFF3FB950) else Color(0xFF8B949E)
    val label = if (isActive) "Active" else "Coming Soon"

    Surface(
        shape = RoundedCornerShape(16.dp),
        color = backgroundColor.copy(alpha = 0.2f),
        border = BorderStroke(1.dp, backgroundColor.copy(alpha = 0.5f))
    ) {
        Text(
            text = label,
            fontSize = 11.sp,
            fontWeight = FontWeight.Medium,
            color = textColor,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
