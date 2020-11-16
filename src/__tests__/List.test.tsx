import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { io } from 'socket.io-client';
import List from '../pages/List';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cookie = 'juid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyYzNiMTU4LTQyZTMtNDIyYy1iMzRkLTBjMjA5YzJiM2QwNCIsIm5hbWUiOiJNw6VucyBKYWNrc29uIiwiZW1haWwiOiJtYW5zLmphY2tzb25AZ21haWwuY29tIiwiaWF0IjoxNjA1NTE5ODY2fQ.00QzBCLDx6-PF8bd3FVBSOkupX_jleyMrCE3xIEbaDY';
Enzyme.configure({ adapter: new Adapter() });

describe('the List', () => {
  it('should display loadin page initially', (done) => {
    const socket = io('http://localhost:8000', {
      transportOptions: {
        polling: {
          extraHeaders: {
            cookies: cookie,
          },
        },
      },
    });
    const fakeStore = mockStore({ socket });
    render(<Provider store={fakeStore}><BrowserRouter><List /></BrowserRouter></Provider>);
    expect(screen.getByText('Loading...'));
    done();
  });
});
