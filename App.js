/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

// Imports: Screens
import MainNavigator from './src/navigators/index';

// Imports: Redux Persist Persister
import { store, persistor } from './src/store/store';

const App: () => React$Node = () => {
  return (
      // Redux: Global Store
      <Provider store={store}>
          <PersistGate
              loading={null}
              persistor={persistor}
          >
              <MainNavigator />
          </PersistGate>
      </Provider>
  );
};


export default App;
