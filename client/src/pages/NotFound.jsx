import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        document.title = 'Page non trouvée — Trouve ton artisan';
    }, []);

    return (
        <main id="main-content">
            <div className="not-found container">
                <h1>404</h1>
                <h2>Page non trouvée</h2>
                <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
                <Link to="/" className="btn btn-home">Retour à l'accueil</Link>
            </div>
        </main>
    );
}

export default NotFound;
