import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WatchlistAsset} from '../model/WatchlistAsset';

interface Props {
  asset: WatchlistAsset;
  showDivider?: boolean;
}

const WatchlistAssetRowComponent: React.FC<Props> = ({asset, showDivider = false}) => {
  const isPositive = asset.change24hPercent >= 0;
  const changeColor = isPositive ? '#3FB950' : '#F85149';
  const sign = isPositive ? '+' : '';

  const formattedPrice = `$${asset.priceUsd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedMarketValue = `$${asset.marketValueUsd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <View style={[styles.rowContainer, showDivider && styles.rowDivider]}>
      <View style={styles.leftCol}>
        <View style={styles.symbolBadge}>
          <Text style={styles.symbolText}>{asset.symbol.slice(0, 3)}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.assetBalance}>
            {asset.balance} {asset.symbol}
          </Text>
        </View>
      </View>

      <View style={styles.rightCol}>
        <Text style={styles.priceText}>{formattedPrice}</Text>
        <View style={styles.metricsRow}>
          <Text style={[styles.changeText, {color: changeColor}]}>
            {sign}
            {asset.change24hPercent.toFixed(2)}%
          </Text>
          <Text style={styles.valueText}> • {formattedMarketValue}</Text>
        </View>
      </View>
    </View>
  );
};

export const WatchlistAssetRow = React.memo(WatchlistAssetRowComponent);

const styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbolBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#21262D',
    borderColor: '#30363D',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  symbolText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F0F6FC',
  },
  nameContainer: {
    justifyContent: 'center',
  },
  assetName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F0F6FC',
  },
  assetBalance: {
    fontSize: 12,
    color: '#8B949E',
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F0F6FC',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 12,
    color: '#8B949E',
  },
});
