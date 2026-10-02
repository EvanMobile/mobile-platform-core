import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface EmptyProps {
  onReload: () => void;
}

export const WatchlistEmptyState: React.FC<EmptyProps> = ({onReload}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.iconText}>📂</Text>
      <Text style={styles.title}>No Assets in Watchlist</Text>
      <Text style={styles.subtitle}>
        Your watchlist is currently empty. Reload or switch data sources.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onReload} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Reload Watchlist</Text>
      </TouchableOpacity>
    </View>
  );
};

interface ErrorProps {
  message: string | null;
  onRetry: () => void;
}

export const WatchlistErrorState: React.FC<ErrorProps> = ({message, onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.iconText}>⚠️</Text>
      <Text style={styles.title}>Failed to Load Watchlist</Text>
      <Text style={styles.subtitle}>
        {message || 'An unexpected network error occurred.'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderColor: '#30363D',
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconText: {
    fontSize: 36,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F0F6FC',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#8B949E',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#238636',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#F0F6FC',
    fontSize: 14,
    fontWeight: '600',
  },
});
