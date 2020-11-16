import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Login from '../pages/Login';

Enzyme.configure({ adapter: new Adapter() });

describe('the login page', () => {
  it('should render a login form', () => {
    render(<Provider store={store}><BrowserRouter><Login /></BrowserRouter></Provider>);
    expect(screen.getByRole('textbox')).toBeDefined();
  });
});
