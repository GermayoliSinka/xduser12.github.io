import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks.js';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/features/auth/auth-slice.js';

/**
 * Single NavBarOption, checks if user is logged in or not to display an option
 * @param option
 * @param to
 * @param displayIfLoggedIn
 * @param jsx
 * @constructor
 */
const NavBarOption = ({ option, to, displayIfLoggedIn, jsx }) => {
  // redux
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const location = useLocation();
  // init
  let isActive = '';
  if (to === location.pathname) {
    isActive = 'active';
  }
  //
  if (typeof jsx !== 'undefined') {
    return <li className="nav-item">{jsx}</li>;
  }
  //
  if (typeof displayIfLoggedIn === 'boolean') {
    if (displayIfLoggedIn && !isLoggedIn) {
      return <></>;
    }
    if (isLoggedIn && !displayIfLoggedIn) {
      return <></>;
    }
  }
  //
  if (to === '/logout') {
    return (
      <li
        onClick={() => {
          dispatch(logout());
        }}
      >
        <span className="nav-link nav-link-clickable">{option}</span>
      </li>
    );
  }
  //
  if (typeof to === 'string') {
    return (
      <li>
        <Link to={to} className={'nav-link ' + isActive}>
          {option}
        </Link>
      </li>
    );
  }
  return <></>;
};
NavBarOption.propTypes = {
  option: PropTypes.string.isRequired,
  to: PropTypes.string,
  displayIfLoggedIn: PropTypes.bool,
  jsx: PropTypes.objectOf(React.JSX),
};
export default NavBarOption;
