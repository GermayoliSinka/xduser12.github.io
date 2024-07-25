
import { Link } from 'react-router-dom';
import './../../assets/scss/stylePages/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4 className="footer-title">About Us</h4>
                        <p className="footer-text">
                            We are a creative agency dedicated to delivering high-quality digital experiences.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/about" className="footer-link">About</Link></li>
                            <li><Link to="/services" className="footer-link">Services</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-title">Contact Us</h4>
                        <p className="footer-text">
                            Email: <a href="mailto:info@example.com" className="footer-email">info@example.com</a>
                        </p>
                        <p className="footer-text">
                            Phone: <a href="tel:+1234567890" className="footer-phone">+123 456 7890</a>
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copy">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
