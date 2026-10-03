import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

export const BridgeTestScreen: React.FC = () => {
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
      <View style={styles.bridgeContent}>
        <Text style={styles.title}>Mobile Platform RN Bridge</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
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
