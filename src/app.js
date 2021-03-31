import React from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {headerAuth} from './constant/connection';
import {persistStore, persistReducer} from 'redux-persist';
const thunk = require('redux-thunk').default;
import {
  validateTokenMiddleware,
  activityLogMiddleware,
} from './redux/middleware/index';
import {PersistGate} from 'redux-persist/integration/react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {encryptTransform} from 'redux-persist-transform-encrypt';
import Route from './pages/route';
import RootReducers from './redux/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth_reducer', 'notification_reducer'],
  transforms: [
    encryptTransform({
      secretKey: headerAuth,
      onError: function (error) {
        // console.log(error, "error transform encrypt")
        // Handle the error.
      },
    }),
  ],
};

const persistReducers = persistReducer(persistConfig, RootReducers);
const store = createStore(
  persistReducers,
  applyMiddleware(thunk, validateTokenMiddleware, activityLogMiddleware),
);
const persist = persistStore(store);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar backgroundColor="#002DBB" />
        <PersistGate persistor={persist}>
          <Route />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
export {store};
