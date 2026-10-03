export type DataSourceMode = 'demo' | 'api';
export type WatchlistStatus = 'idle' | 'loading' | 'success' | 'error';

export interface WatchlistAsset {
  readonly id: string;
  readonly symbol: string;
  readonly name: string;
  readonly balance: number;
  readonly priceUsd: number;
  readonly change24hPercent: number;
  readonly marketValueUsd: number;
  readonly allocationPercent: number;
}

export interface WatchlistSummary {
  readonly accountValueUsd: number;
  readonly change24hUsd: number;
  readonly change24hPercent: number;
}
