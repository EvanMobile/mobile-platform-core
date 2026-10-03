import {IWatchlistDataSource} from './WatchlistDataSource';
import {WatchlistApiResponse} from '../model/WatchlistApiResponse';
import mockData from './mock/watchlist-response.json';

export class DemoDataSource implements IWatchlistDataSource {
  async fetchWatchlist(): Promise<WatchlistApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData as WatchlistApiResponse);
      }, 600);
    });
  }
}
