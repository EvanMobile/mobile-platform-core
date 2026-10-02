import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WatchlistAsset} from '../model/WatchlistAsset';
import {WatchlistAssetRow} from './WatchlistAssetRow';

interface Props {
  assets: WatchlistAsset[];
}

export const WatchlistAssetsCard: React.FC<Props> = ({assets}) => {
  if (!assets || assets.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Assets</Text>
      <View style={styles.listContainer}>
        {assets.map((item, index) => (
          <WatchlistAssetRow
            key={item.id}
            asset={item}
            showDivider={index < assets.length - 1}
          />
        ))}
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
    marginBottom: 8,
  },
  listContainer: {
    paddingTop: 4,
  },
});
