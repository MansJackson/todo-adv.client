import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home: React.FunctionComponent = (): JSX.Element => (
  <div className="wrapper">
    <Navbar />
    <div className="home_body">
      <h1 className="home_header">Welcome!</h1>
      <p className="home_text">
        This is an online application to create lists
        <br />
        and collaborate on them with your friends and family.
      </p>
    </div>
  </div>
);

export default Home;
