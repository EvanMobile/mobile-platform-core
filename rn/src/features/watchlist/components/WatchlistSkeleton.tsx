import React from 'react';
import {StyleSheet, View} from 'react-native';

export const WatchlistSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerBlock} />
      <View style={styles.subtitleBlock} />

      {/* Summary Card Skeleton */}
      <View style={styles.cardSkeleton}>
        <View style={styles.labelBlock} />
        <View style={styles.balanceBlock} />
        <View style={styles.badgeBlock} />
      </View>

      {/* Donut Chart Skeleton */}
      <View style={styles.chartSkeleton} />

      {/* List Rows Skeleton */}
      {[1, 2, 3, 4].map((key) => (
        <View key={key} style={styles.rowSkeleton}>
          <View style={styles.circleBlock} />
          <View style={styles.textColumn}>
            <View style={styles.titleBlock} />
            <View style={styles.subtextBlock} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0D1117',
  },
  headerBlock: {
    width: 160,
    height: 28,
    backgroundColor: '#21262D',
    borderRadius: 6,
    marginTop: 16,
  },
  subtitleBlock: {
    width: 220,
    height: 14,
    backgroundColor: '#161B22',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 20,
  },
  cardSkeleton: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderColor: '#30363D',
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  labelBlock: {
    width: 120,
    height: 12,
    backgroundColor: '#21262D',
    borderRadius: 4,
  },
  balanceBlock: {
    width: 200,
    height: 32,
    backgroundColor: '#21262D',
    borderRadius: 6,
    marginTop: 12,
  },
  badgeBlock: {
    width: 140,
    height: 24,
    backgroundColor: '#21262D',
    borderRadius: 12,
    marginTop: 12,
  },
  chartSkeleton: {
    height: 140,
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderColor: '#30363D',
    borderWidth: 1,
    marginBottom: 16,
  },
  rowSkeleton: {
    height: 72,
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderColor: '#30363D',
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBlock: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#21262D',
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
  },
  titleBlock: {
    width: 100,
    height: 16,
    backgroundColor: '#21262D',
    borderRadius: 4,
  },
  subtextBlock: {
    width: 140,
    height: 12,
    backgroundColor: '#21262D',
    borderRadius: 4,
    marginTop: 6,
  },
});
