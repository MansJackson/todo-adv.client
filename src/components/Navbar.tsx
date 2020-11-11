import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsLoggedInA } from '../actions';
import { NavbarProps, RootState } from '../types';

const Navbar: React.FunctionComponent<NavbarProps> = (props): JSX.Element => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const logOut = () => {
    document.cookie = 'juid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn && <button onClick={logOut} type="button">Log Out</button>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, {
  setIsLoggedIn: setIsLoggedInA,
})(Navbar);
