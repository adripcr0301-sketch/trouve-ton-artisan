import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCategories } from '../services/api';
import SearchBar from './SearchBar';
import logo from '/Logo.png';

function Header() {
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => {});
    }, []);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="site-header" role="banner">
            <nav className="navbar navbar-expand-lg container" aria-label="Navigation principale">
                <Link className="navbar-brand" to="/" aria-label="Trouve ton artisan — Accueil">
                    <img src={logo} alt="Trouve ton artisan" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-label="Ouvrir le menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="nav-menu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {categories.map((cat) => (
                            <li className="nav-item" key={cat.id}>
                                <NavLink
                                    className="nav-link"
                                    to={`/categories/${cat.id}`}
                                    onClick={closeMenu}
                                >
                                    {cat.nom}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="d-lg-flex" onClick={closeMenu}>
                        <SearchBar />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
