// Setting up App.js with the Redux store and Provider wrapper allows our app to access Redux store. Then, we'll need 
// to go into each comp that needs access to Redux store to set up the connection

import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();       // Create Redux store by calling ConfigureStore function into the variable store

export default function App() {
  return (
    // The Provider wrapper, + passing the store as a prop, gives the Main comp and its child comp's access to the Redux store 
    <Provider store={store}>      
      <Main />
    </Provider>
  );
}


