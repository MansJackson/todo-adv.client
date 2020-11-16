import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import store from '../redux/store';
import Dashboard from '../pages/Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

describe('the dashboard', () => {
  it('should 2 main sections for lists', () => {
    render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);
    expect(screen.getByRole('heading', { name: /my lists/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shared with me/i })).toBeInTheDocument();
  });

  it('should have a button to add lists', () => {
    render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('should have an input field for list title', () => {
    render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);
    userEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render lists stored in state', () => {
    const fakeStore = mockStore({
      lists: {
        owned: [
          {
            id: '2c0cf43e-676c-4256-8e6b-0d3208e8582c',
            title: 'Hejsan',
            owner: {
              id: 'c0c01b79-c1a8-4539-b1df-c03da24645bd',
              initials: 'MJ',
              mousePosition: {
                x: 47,
                y: 40,
              },
              connected: false,
            },
            editors: [],
            items: [],
          },
        ],
      },
    });

    render(<Provider store={fakeStore}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);
    expect(screen.getByText('Hejsan')).toBeInTheDocument();
  });
});
