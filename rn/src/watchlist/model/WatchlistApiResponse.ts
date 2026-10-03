export interface WatchlistApiAsset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  change24hPercent: number;
}

export interface WatchlistApiResponse {
  status: string;
  timestamp: number;
  data: {
    accountValueUsd: number;
    assets: WatchlistApiAsset[];
  };
}
