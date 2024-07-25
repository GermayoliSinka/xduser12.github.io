import { Link } from 'react-router-dom';
import './../../assets/scss/stylePages/navar.css'; // Asegúrate de crear este archivo CSS

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand custom-brand" to="#">
                    <span className="letter">PUBLICIDAD - PRUEBA</span>
                </Link>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;