// @flow
import { createStackNavigator } from 'react-navigation';
import ProductScanContainer from '../components/ProductScan/ProductScanContainer';
import type { Navigation } from '../types';

export type NavigationObject = { navigation: Navigation };

export const stackNavigatorScreens = {
  ProductScan: {
    screen: ProductScanContainer,
    navigationOptions: () => ({
      header: null,
    }),
  },
};

export const RootStackNavigator = createStackNavigator(stackNavigatorScreens, {
  initialRouteName: 'ProductScan',
});
