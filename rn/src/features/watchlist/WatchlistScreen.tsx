import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useWatchlist} from './hooks/useWatchlist';
import {WatchlistHeader} from './components/WatchlistHeader';
import {WatchlistSummaryCard} from './components/WatchlistSummaryCard';
import {WatchlistAllocationChart} from './components/WatchlistAllocationChart';
import {WatchlistAssetsCard} from './components/WatchlistAssetsCard';
import {WatchlistSourceSwitch} from './components/WatchlistSourceSwitch';
import {WatchlistSkeleton} from './components/WatchlistSkeleton';
import {
  WatchlistEmptyState,
  WatchlistErrorState,
} from './components/WatchlistStateViews';

export const WatchlistScreen: React.FC = () => {
  const {
    summary,
    assets,
    status,
    error,
    isRefreshing,
    sourceMode,
    setSourceMode,
    refresh,
    reload,
    clearError,
  } = useWatchlist();

  // Display dismissible native Alert when a refresh/source-switch fails over existing data
  useEffect(() => {
    if (error && assets.length > 0) {
      Alert.alert(
        'Request Failed',
        error,
        [
          {
            text: 'OK',
            onPress: () => clearError(),
          },
        ],
        {cancelable: true},
      );
    }
  }, [error, assets.length, clearError]);

  // Display Skeleton during initial loading when no data exists
  if (status === 'loading' && !isRefreshing && assets.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WatchlistSkeleton />
      </SafeAreaView>
    );
  }

  // Display full-screen Error View if initial load fails completely with no data
  if (status === 'error' && assets.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <WatchlistHeader />
          <WatchlistErrorState message={error} onRetry={reload} />
          <WatchlistSourceSwitch
            sourceMode={sourceMode}
            isLoading={status === 'loading'}
            onSourceChange={setSourceMode}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor="#3FB950"
            colors={['#3FB950']}
          />
        }>
        {/* Page Header */}
        <WatchlistHeader />

        {/* Card 1: Portfolio Balance */}
        <WatchlistSummaryCard summary={summary} />

        {/* Card 2: Asset Allocation (Donut + Legend + Bar) */}
        <WatchlistAllocationChart assets={assets} />

        {/* Card 3: Your Assets (Unified Assets Card) */}
        {assets.length > 0 ? (
          <WatchlistAssetsCard assets={assets} />
        ) : (
          <WatchlistEmptyState onReload={reload} />
        )}

        {/* Bottom Control: Data Source Switch */}
        <WatchlistSourceSwitch
          sourceMode={sourceMode}
          isLoading={status === 'loading'}
          onSourceChange={setSourceMode}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    paddingHorizontal: 20,
  },
});
