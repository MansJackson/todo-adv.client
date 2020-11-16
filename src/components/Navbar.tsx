import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { setIsLoggedInA } from '../redux/actions';
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
    window.localStorage.removeItem('auth');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className={`navbar ${filled ? 'filled' : ''}`}>
      <div className="nav_link link_home">
        {isLoggedIn ? <Link to="/">Home</Link> : null}
      </div>
      {children}
      {isLoggedIn
        ? <Button name="logout" variant="contained" onClick={logOut}>Log Out</Button>
        : (
          <>
            <Link to="/login">
              <Button name="login" variant="contained" color="primary">
                Log In
              </Button>
            </Link>
            <div className="space" />
            <Link to="/register">
              <Button name="register" variant="outlined" color="primary">
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
