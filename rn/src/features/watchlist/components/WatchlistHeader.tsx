import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const WatchlistHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <Text style={styles.subtitle}>Crypto & Digital Asset Holdings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F0F6FC',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B949E',
    marginTop: 4,
  },
});
