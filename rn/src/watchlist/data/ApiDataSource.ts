import {IWatchlistDataSource} from './WatchlistDataSource';
import {WatchlistApiResponse} from '../model/WatchlistApiResponse';

export class ApiDataSource implements IWatchlistDataSource {
  private readonly endpoint: string;

  constructor(endpoint = 'https://api.example.com/v1/watchlist') {
    this.endpoint = endpoint;
  }

  async fetchWatchlist(): Promise<WatchlistApiResponse> {
    const response = await fetch(this.endpoint);
    if (!response.ok) {
      throw new Error(`API HTTP Error: ${response.status} ${response.statusText}`);
    }
    const data: WatchlistApiResponse = await response.json();
    return data;
  }
}
