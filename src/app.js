import React from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {headerAuth} from './constant/connection';
import {persistStore, persistReducer} from 'redux-persist';
const thunk = require('redux-thunk').default;
import {validateTokenMiddleware} from './redux/middleware/index';
import {PersistGate} from 'redux-persist/integration/react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {encryptTransform} from 'redux-persist-transform-encrypt';
import Route from './pages/route';
import RootReducers from './redux/reducer';
import {ToastContextProvider} from './context/ToastContext';
import {colors} from './constant/color';
import {startNetworkLogging} from 'react-native-network-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth_reducer'],
  transforms: [
    encryptTransform({
      secretKey: headerAuth,
      onError: function (error) {},
    }),
  ],
};

const persistReducers = persistReducer(persistConfig, RootReducers);
const store = createStore(
  persistReducers,
  // applyMiddleware(thunk, validateTokenMiddleware),
  applyMiddleware(thunk, validateTokenMiddleware),
);
const persist = persistStore(store);
startNetworkLogging();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ToastContextProvider>
          <StatusBar backgroundColor={colors.main_color} />
          <PersistGate persistor={persist}>
            <Route />
          </PersistGate>
        </ToastContextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
export {store};
