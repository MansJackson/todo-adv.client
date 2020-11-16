import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
