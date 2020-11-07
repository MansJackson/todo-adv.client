import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

function App(): JSX.Element {
  return (
    <Provider store={store} />
  );
}

export default App;
