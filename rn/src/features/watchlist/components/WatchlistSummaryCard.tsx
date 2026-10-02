import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WatchlistSummary} from '../model/WatchlistAsset';

interface Props {
  summary: WatchlistSummary | null;
}

export const WatchlistSummaryCard: React.FC<Props> = ({summary}) => {
  if (!summary) {
    return null;
  }

  const isPositive = summary.change24hUsd >= 0;
  const changeColor = isPositive ? '#3FB950' : '#F85149';
  const sign = isPositive ? '+' : '';

  const formattedBalance = `$${summary.accountValueUsd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedChange = `${sign}$${Math.abs(summary.change24hUsd).toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )} (${sign}${summary.change24hPercent.toFixed(2)}%)`;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Portfolio Balance</Text>
      <Text style={styles.balance}>{formattedBalance}</Text>
      <View style={styles.changeBadge}>
        <Text style={[styles.changeText, {color: changeColor}]}>
          {formattedChange} 24h
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderColor: '#30363D',
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8B949E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F0F6FC',
    marginTop: 8,
    marginBottom: 12,
  },
  changeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#21262D',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: '#30363D',
    borderWidth: 1,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
