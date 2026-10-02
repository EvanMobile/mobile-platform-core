import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {WatchlistScreen} from './features/watchlist/WatchlistScreen';

type AppTab = 'watchlist' | 'bridge';

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<AppTab>('watchlist');
  const [nativeMessage, setNativeMessage] = useState<string>('');

  const callNative = async () => {
    try {
      const result = await NativeModules.AppBridge.hello();
      setNativeMessage(result);
    } catch (e) {
      console.error(e);
      setNativeMessage('Error calling native');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Tab Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navTab, activeTab === 'watchlist' && styles.activeNavTab]}
          onPress={() => setActiveTab('watchlist')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.navTabText,
              activeTab === 'watchlist' && styles.activeNavTabText,
            ]}>
            RN Watchlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTab, activeTab === 'bridge' && styles.activeNavTab]}
          onPress={() => setActiveTab('bridge')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.navTabText,
              activeTab === 'bridge' && styles.activeNavTabText,
            ]}>
            Bridge Test
          </Text>
        </TouchableOpacity>
      </View>

      {/* View Content */}
      {activeTab === 'watchlist' ? (
        <WatchlistScreen />
      ) : (
        <View style={styles.bridgeContent}>
          <Text style={styles.title}>Mobile Platform RN</Text>
          <Text style={styles.subtitle}>React Native ↔ Android Integration</Text>

          <View style={styles.bridgeContainer}>
            <TouchableOpacity style={styles.button} onPress={callNative}>
              <Text style={styles.buttonText}>Call Android Native</Text>
            </TouchableOpacity>
            {nativeMessage ? (
              <Text style={styles.resultText}>{nativeMessage}</Text>
            ) : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderBottomColor: '#30363D',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  navTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeNavTab: {
    backgroundColor: '#21262D',
    borderColor: '#30363D',
    borderWidth: 1,
  },
  navTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B949E',
  },
  activeNavTabText: {
    color: '#F0F6FC',
  },
  bridgeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F0F6FC',
  },
  subtitle: {
    fontSize: 15,
    color: '#8B949E',
  },
  bridgeContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#238636',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#F0F6FC',
    fontSize: 15,
    fontWeight: '600',
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: '#3FB950',
    fontWeight: 'bold',
  },
});

export default App;
