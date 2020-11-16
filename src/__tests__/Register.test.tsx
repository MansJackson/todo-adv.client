import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Register from '../pages/Register';

Enzyme.configure({ adapter: new Adapter() });

describe('the login page', () => {
  it('should render a Register form', () => {
    render(<Provider store={store}><BrowserRouter><Register /></BrowserRouter></Provider>);
    expect(screen.getAllByRole('textbox', { name: '' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /register/i })).toHaveLength(2);
  });
});
