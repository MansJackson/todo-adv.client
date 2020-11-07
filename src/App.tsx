import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Register from './pages/Register';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
