import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DataSourceMode} from '../model/WatchlistAsset';

interface Props {
  sourceMode: DataSourceMode;
  isLoading?: boolean;
  onSourceChange: (mode: DataSourceMode) => void;
}

export const WatchlistSourceSwitch: React.FC<Props> = ({
  sourceMode,
  isLoading = false,
  onSourceChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Data Source</Text>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#3FB950"
            style={styles.spinner}
          />
        ) : null}
      </View>

      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            sourceMode === 'demo' && styles.activeSegment,
          ]}
          onPress={() => onSourceChange('demo')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.segmentText,
              sourceMode === 'demo' && styles.activeText,
            ]}>
            Demo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentButton,
            sourceMode === 'api' && styles.activeSegment,
          ]}
          onPress={() => onSourceChange('api')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.segmentText,
              sourceMode === 'api' && styles.activeText,
            ]}>
            API
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B949E',
  },
  spinner: {
    marginLeft: 8,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderColor: '#30363D',
    borderWidth: 1,
    padding: 3,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: '#238636',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B949E',
  },
  activeText: {
    color: '#F0F6FC',
  },
});
