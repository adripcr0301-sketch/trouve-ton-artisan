import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PAGES = {
    'mentions-legales': 'Mentions légales',
    'donnees-personnelles': 'Données personnelles',
    'accessibilite': 'Accessibilité',
    'cookies': 'Cookies',
};

function Legal() {
    const { page } = useParams();
    const title = PAGES[page] ?? 'Informations légales';

    useEffect(() => {
        document.title = `${title} — Trouve ton artisan`;
        document.querySelector('meta[name="description"]')?.setAttribute(
            'content',
            `${title} du site Trouve ton artisan — Région Auvergne-Rhône-Alpes.`
        );
    }, [title]);

    return (
        <main id="main-content">
            <div className="container legal-page">
                <h1>{title}</h1>
                <p>Page en construction.</p>
            </div>
        </main>
    );
}

export default Legal;
