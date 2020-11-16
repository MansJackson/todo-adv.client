import React from 'react';
import dotenv from 'dotenv';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

dotenv.config();

const Home: React.FunctionComponent = (): JSX.Element => (
  <>
    <Navbar filled />
    <div className="wrapper">
      <div className="home_body">
        <h1 className="home_header">Welcome!</h1>
        <p className="home_text">
          This is an online application to create lists
          <br />
          and collaborate on them with your friends and family.
        </p>
        {process.env.SERVER_URL}
      </div>
    </div>
  </>
);

export default Home;
