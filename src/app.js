import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Route from './pages/route';
import RootReducers from './redux/reducer';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["dummy_reducer"]
}
const persistReducers = persistReducer(persistConfig, RootReducers)
const store = createStore(persistReducers)
const persist = persistStore(store)

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
  )
}
export default App

