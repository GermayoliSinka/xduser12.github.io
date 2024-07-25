import { Link } from 'react-router-dom';
import './../../assets/scss/stylePages/navar.css'; 


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="navbar-brand" to="#">
                    <span className="brand-text">PUBLICIDAD - PRUEBA</span>
                </Link>
                <div className="navbar-center">
                    <ul className="navbar-menu">
                        <li className="nav-item">
                            <Link className="nav-link" to="/contactos">Contactos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Publicaciones</Link>
                        </li>
                    </ul>
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;