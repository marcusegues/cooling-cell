import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './src/configureStore';
import { RootStackNavigator } from './src/navigation/Navigator';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    );
  }
}
