import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
