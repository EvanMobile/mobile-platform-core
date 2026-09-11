import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

function App(): React.JSX.Element {
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
      <View style={styles.content}>
        <Text style={styles.title}>Mobile Platform RN</Text>
        <Text style={styles.subtitle}>React Native is running.</Text>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  bridgeContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default App;
