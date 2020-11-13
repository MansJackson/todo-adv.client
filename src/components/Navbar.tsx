import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { setIsLoggedInA } from '../actions';
import { NavbarProps, RootState, NavbarOwnProps } from '../types';
import '../styles/Navbar.css';

const Navbar: React.FunctionComponent<
NavbarProps & NavbarOwnProps & { children?: JSX.Element }
> = (props): JSX.Element => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    filled,
    children,
  } = props;

  const logOut = () => {
    document.cookie = 'juid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
  };

  return (
    <nav className={`navbar ${filled ? 'filled' : ''}`}>
      <div className="nav_link link_home">
        {isLoggedIn ? <Link to="/">Home</Link> : null}
      </div>
      {children}
      {isLoggedIn
        ? <Button variant="contained" onClick={logOut}>Log Out</Button>
        : (
          <>
            <Link to="/login">
              <Button variant="contained" color="primary">
                Log In
              </Button>
            </Link>
            <div className="space" />
            <Link to="/register">
              <Button variant="outlined" color="primary">
                Register
              </Button>
            </Link>
          </>
        )}
    </nav>
  );
};

const mapStateToProps = (state: RootState, ownProps: NavbarOwnProps) => ({
  isLoggedIn: state.isLoggedIn,
  filled: ownProps.filled,
});

export default connect(mapStateToProps, {
  setIsLoggedIn: setIsLoggedInA,
})(Navbar);
