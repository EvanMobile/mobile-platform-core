export const BRIDGE_ROUTES = {
  BRIDGE_TEST: 'BridgeTest',
} as const;

export type BridgeRouteName = (typeof BRIDGE_ROUTES)[keyof typeof BRIDGE_ROUTES];
