import {useState, useEffect, useCallback, useRef} from 'react';
import {
  WatchlistAsset,
  WatchlistSummary,
  WatchlistStatus,
  DataSourceMode,
} from '../model/WatchlistAsset';
import {WatchlistRepository} from '../WatchlistRepository';
import {DemoDataSource} from '../data/DemoDataSource';
import {ApiDataSource} from '../data/ApiDataSource';
import {IWatchlistDataSource} from '../data/WatchlistDataSource';

function createDataSource(mode: DataSourceMode): IWatchlistDataSource {
  return mode === 'api' ? new ApiDataSource() : new DemoDataSource();
}

export interface UseWatchlistReturn {
  summary: WatchlistSummary | null;
  assets: WatchlistAsset[];
  status: WatchlistStatus;
  error: string | null;
  isRefreshing: boolean;
  sourceMode: DataSourceMode;
  setSourceMode: (mode: DataSourceMode) => void;
  refresh: () => Promise<void>;
  reload: () => Promise<void>;
  clearError: () => void;
}

export function useWatchlist(): UseWatchlistReturn {
  const [summary, setSummary] = useState<WatchlistSummary | null>(null);
  const [assets, setAssets] = useState<WatchlistAsset[]>([]);
  const [status, setStatus] = useState<WatchlistStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [sourceMode, setSourceMode] = useState<DataSourceMode>('demo');

  const requestIdRef = useRef<number>(0);
  const assetsRef = useRef<WatchlistAsset[]>(assets);
  assetsRef.current = assets;

  const loadData = useCallback(
    async (isPullToRefresh = false) => {
      const currentRequestId = ++requestIdRef.current;

      if (isPullToRefresh) {
        setIsRefreshing(true);
      } else {
        setStatus('loading');
        setError(null);
      }

      try {
        const dataSource = createDataSource(sourceMode);
        const repository = new WatchlistRepository(dataSource);
        const result = await repository.getWatchlist();

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        setSummary(result.summary);
        setAssets(result.assets);
        setStatus('success');
        setError(null);
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch watchlist';

        if (assetsRef.current.length > 0) {
          setError(errorMessage);
          setStatus('success');
        } else {
          setSummary(null);
          setAssets([]);
          setError(errorMessage);
          setStatus('error');
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsRefreshing(false);
        }
      }
    },
    [sourceMode],
  );

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const refresh = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  const reload = useCallback(async () => {
    await loadData(false);
  }, [loadData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
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
  };
}
