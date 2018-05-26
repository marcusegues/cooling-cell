import React from 'react';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { configureStore } from './src/configureStore';
import { RootStackNavigator } from './src/navigation/Navigator';

const store = configureStore();

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-light': require('./assets/fonts/openSans/OpenSans-Light.ttf'),
      'open-sans-semi-bold': require('./assets/fonts/openSans/OpenSans-SemiBold.ttf'),
    });

    this.setState({ fontsLoaded: true });
  }

  render() {
    return this.state.fontsLoaded ? (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    ) : null;
  }
}
