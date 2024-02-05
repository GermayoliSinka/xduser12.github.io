import NavBarOption from './NavBarOption.jsx';
import PropTypes from 'prop-types';
const NavBar = ({ main, right }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container ">
        <span className="navbar-brand">Navbar</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto d-flex flex-wrap">
            {main.map((_navBarOption, index) => (
              <NavBarOption
                key={index}
                option={_navBarOption.option}
                to={_navBarOption.to}
                displayIfLoggedIn={_navBarOption.displayIfLoggedIn}
                jsx={_navBarOption.jsx}
              />
            ))}
          </ul>
          <ul className="navbar-nav">
            {right.map((_navBarOption, index) => (
              <NavBarOption
                key={index}
                option={_navBarOption.option}
                to={_navBarOption.to}
                displayIfLoggedIn={_navBarOption.displayIfLoggedIn}
                jsx={_navBarOption.jsx}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
NavBar.propTypes = {
  main: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
};
export default NavBar;
