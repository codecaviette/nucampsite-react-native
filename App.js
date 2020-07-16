// Setting up App.js with the Redux store and Provider wrapper allows our app to access Redux store. Then, we'll need 
// to go into each comp that needs access to Redux store to set up the connection

import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';


const { persistor, store } = ConfigureStore();       // Create Redux store by calling ConfigureStore function into the variable store

export default function App() {
  return (
    // The Provider wrapper, + passing the store as a prop, gives the Main comp and its child comp's access to the Redux store 
    <Provider store={store}>      
      <PersistGate
        loading={<Loading />}
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}


