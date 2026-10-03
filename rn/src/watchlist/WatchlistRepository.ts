import {IWatchlistDataSource} from './data/WatchlistDataSource';
import {WatchlistMapper} from './data/WatchlistMapper';
import {WatchlistAsset, WatchlistSummary} from './model/WatchlistAsset';

export class WatchlistRepository {
  private readonly dataSource: IWatchlistDataSource;

  constructor(dataSource: IWatchlistDataSource) {
    this.dataSource = dataSource;
  }

  async getWatchlist(): Promise<{
    summary: WatchlistSummary;
    assets: WatchlistAsset[];
  }> {
    try {
      const rawResponse = await this.dataSource.fetchWatchlist();
      if (!rawResponse || rawResponse.status !== 'success' || !rawResponse.data) {
        throw new Error('Invalid watchlist API response format');
      }
      return WatchlistMapper.mapResponseToDomain(rawResponse);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Watchlist Data Error: ${error.message}`);
      }
      throw new Error('An unknown error occurred while loading watchlist');
    }
  }
}
