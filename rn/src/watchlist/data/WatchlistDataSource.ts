import {WatchlistApiResponse} from '../model/WatchlistApiResponse';

export interface IWatchlistDataSource {
  fetchWatchlist(): Promise<WatchlistApiResponse>;
}
