import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="container">
                <nav aria-label="Liens légaux" className="footer-links">
                    <Link to="/legal/mentions-legales">Mentions légales</Link>
                    <Link to="/legal/donnees-personnelles">Données personnelles</Link>
                    <Link to="/legal/accessibilite">Accessibilité</Link>
                    <Link to="/legal/cookies">Cookies</Link>
                </nav>
                <address style={{ fontStyle: 'normal' }}>
                    101 cours Charlemagne · CS 20033 · 69269 LYON CEDEX 02 · France<br />
                    <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
                </address>
            </div>
        </footer>
    );
}

export default Footer;
