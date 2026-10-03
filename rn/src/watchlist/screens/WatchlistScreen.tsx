import React, {useEffect} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useWatchlist} from '../hooks/useWatchlist';
import {WatchlistHeader} from '../components/WatchlistHeader';
import {WatchlistSummaryCard} from '../components/WatchlistSummaryCard';
import {WatchlistAllocationChart} from '../components/WatchlistAllocationChart';
import {WatchlistAssetsCard} from '../components/WatchlistAssetsCard';
import {WatchlistSourceSwitch} from '../components/WatchlistSourceSwitch';
import {WatchlistSkeleton} from '../components/WatchlistSkeleton';
import {
  WatchlistEmptyState,
  WatchlistErrorState,
} from '../components/WatchlistStateViews';

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

  if (status === 'loading' && !isRefreshing && assets.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WatchlistSkeleton />
      </SafeAreaView>
    );
  }

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
        <WatchlistHeader />
        <WatchlistSummaryCard summary={summary} />
        <WatchlistAllocationChart assets={assets} />
        {assets.length > 0 ? (
          <WatchlistAssetsCard assets={assets} />
        ) : (
          <WatchlistEmptyState onReload={reload} />
        )}
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
