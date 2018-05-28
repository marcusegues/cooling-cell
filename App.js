import React from 'react';
import { Provider } from 'react-redux';
import { Font, Asset } from 'expo';
import { configureStore } from './src/configureStore';
import { RootStackNavigator } from './src/navigation/Navigator';

const store = configureStore();

export default class App extends React.Component {
  state = {
    resourcesLoaded: false,
  };

  async componentDidMount() {
    Promise.all([
      Asset.loadAsync([require('./assets/sounds/beep.mp3')]),
      Font.loadAsync({
        'open-sans-regular': require('./assets/fonts/openSans/OpenSans-Regular.ttf'),
        'open-sans-light': require('./assets/fonts/openSans/OpenSans-Light.ttf'),
        'open-sans-semi-bold': require('./assets/fonts/openSans/OpenSans-SemiBold.ttf'),
      }),
    ]).then(() => this.setState({ resourcesLoaded: true }));
  }

  render() {
    return this.state.resourcesLoaded ? (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    ) : null;
  }
}
