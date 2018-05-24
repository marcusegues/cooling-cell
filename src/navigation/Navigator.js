import { createStackNavigator } from 'react-navigation';
import { ProductScanContainer } from '../components/ProductScan/ProductScanContainer';
export type NavigationObject = { navigation: Navigation };

export const stackNavigatorScreens = {
  ProductScan: {
    screen: ProductScanContainer,
    navigationOptions: ({ navigation }: NavigationObject) => ({
      header: null,
    }),
  },
};

export const RootStackNavigator = createStackNavigator(stackNavigatorScreens);
