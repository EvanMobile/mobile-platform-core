import React, {useState} from 'react';
import {BRIDGE_ROUTES, BridgeRouteName} from './routes';
import {BridgeTestScreen} from '../screens/BridgeTestScreen';

export const AppRouter: React.FC = () => {
  const [currentRoute] = useState<BridgeRouteName>(BRIDGE_ROUTES.BRIDGE_TEST);

  switch (currentRoute) {
    case BRIDGE_ROUTES.BRIDGE_TEST:
    default:
      return <BridgeTestScreen />;
  }
};
