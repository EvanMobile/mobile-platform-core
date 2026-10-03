export const WATCHLIST_ROUTES = {
  WATCHLIST_MAIN: 'WatchlistMain',
} as const;

export type WatchlistRouteName = (typeof WATCHLIST_ROUTES)[keyof typeof WATCHLIST_ROUTES];
