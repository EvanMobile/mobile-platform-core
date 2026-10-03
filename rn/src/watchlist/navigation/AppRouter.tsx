import React, {useState} from 'react';
import {WATCHLIST_ROUTES, WatchlistRouteName} from './routes';
import {WatchlistScreen} from '../screens/WatchlistScreen';

export const AppRouter: React.FC = () => {
  const [currentRoute] = useState<WatchlistRouteName>(WATCHLIST_ROUTES.WATCHLIST_MAIN);

  switch (currentRoute) {
    case WATCHLIST_ROUTES.WATCHLIST_MAIN:
    default:
      return <WatchlistScreen />;
  }
};
