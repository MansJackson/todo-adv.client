import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import store from '../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('The home page', () => {
  it('should render <Navbar />', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  it('should render welcome message', () => {
    render(<Provider store={store}><BrowserRouter><Home /></BrowserRouter></Provider>);
    expect(screen.getByRole('heading', { name: /welcome!/i })).toBeDefined();
  });
});
