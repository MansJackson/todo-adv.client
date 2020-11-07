import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
