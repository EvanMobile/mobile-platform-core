import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {WatchlistAsset} from '../model/WatchlistAsset';

interface Props {
  assets: WatchlistAsset[];
}

const ASSET_COLORS: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#14F195',
  USDC: '#2775CA',
};

function getAssetColor(symbol: string, index: number): string {
  if (ASSET_COLORS[symbol]) {
    return ASSET_COLORS[symbol];
  }
  const fallbackColors = ['#A371F7', '#38D430', '#F25D9C', '#E3B341'];
  return fallbackColors[index % fallbackColors.length];
}

const SVG_SIZE = 100;
const RADIUS = 40;
const STROKE_WIDTH = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const WatchlistAllocationChart: React.FC<Props> = ({assets}) => {
  if (!assets || assets.length === 0) {
    return null;
  }

  let cumulativeOffset = 0;
  const slices = assets.map((asset, index) => {
    const dashLength = (asset.allocationPercent / 100) * CIRCUMFERENCE;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += dashLength;

    return {
      ...asset,
      color: getAssetColor(asset.symbol, index),
      dashLength,
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Asset Allocation</Text>

      <View style={styles.contentRow}>
        <View style={styles.donutContainer}>
          <Svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
            <G origin={`${SVG_SIZE / 2}, ${SVG_SIZE / 2}`} rotation={-90}>
              {slices.map((slice) => (
                <Circle
                  key={slice.id}
                  cx={SVG_SIZE / 2}
                  cy={SVG_SIZE / 2}
                  r={RADIUS}
                  stroke={slice.color}
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={[slice.dashLength, CIRCUMFERENCE - slice.dashLength]}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="butt"
                />
              ))}
            </G>
          </Svg>

          <View style={styles.donutCenterHole}>
            <Text style={styles.holeText}>{assets.length}</Text>
            <Text style={styles.holeSubtext}>Assets</Text>
          </View>
        </View>

        <View style={styles.legendContainer}>
          {slices.map((slice) => (
            <View key={slice.id} style={styles.legendItem}>
              <View style={[styles.colorDot, {backgroundColor: slice.color}]} />
              <Text style={styles.legendSymbol}>{slice.symbol}</Text>
              <Text style={styles.legendPercent}>
                {slice.allocationPercent.toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
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
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C9D1D9',
    marginBottom: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donutContainer: {
    width: SVG_SIZE,
    height: SVG_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  donutCenterHole: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#161B22',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#30363D',
    borderWidth: 1,
  },
  holeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F0F6FC',
  },
  holeSubtext: {
    fontSize: 10,
    color: '#8B949E',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendSymbol: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F0F6FC',
    width: 50,
  },
  legendPercent: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8B949E',
    textAlign: 'right',
    flex: 1,
  },
});
