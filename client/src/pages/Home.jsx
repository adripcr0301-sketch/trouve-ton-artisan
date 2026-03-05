import { useEffect, useState } from 'react';
import { getArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

const STEPS = [
    { num: 1, text: 'Choisir la catégorie d\'artisanat dans le menu.' },
    { num: 2, text: 'Choisir un artisan.' },
    { num: 3, text: 'Le contacter via le formulaire de contact.' },
    { num: 4, text: 'Une réponse sera apportée sous 48h.' },
];

function Home() {
    const [topArtisans, setTopArtisans] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.title = 'Trouve ton artisan — Auvergne-Rhône-Alpes';
        document.querySelector('meta[name="description"]')?.setAttribute(
            'content',
            'Trouvez un artisan de confiance en région Auvergne-Rhône-Alpes : bâtiment, alimentation, fabrication, services.'
        );
        getArtisans({ top: 'true' })
            .then(setTopArtisans)
            .catch(() => setError(true));
    }, []);

    return (
        <main id="main-content">
            {/* Section étapes */}
            <section className="steps-section" aria-labelledby="steps-title">
                <div className="container">
                    <h1 id="steps-title">Comment trouver mon artisan ?</h1>
                    <div className="row g-3">
                        {STEPS.map((step) => (
                            <div className="col-12 col-sm-6 col-lg-3" key={step.num}>
                                <div className="step-card">
                                    <div className="step-number" aria-hidden="true">{step.num}</div>
                                    <p>{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section artisans du mois */}
            <section className="top-artisans-section" aria-labelledby="top-title">
                <div className="container">
                    <h2 id="top-title">Artisans du mois</h2>
                    {error && (
                        <p className="text-danger" role="alert">
                            Impossible de charger les artisans.
                        </p>
                    )}
                    <div className="row g-3">
                        {topArtisans.map((artisan) => (
                            <div className="col-12 col-md-6 col-lg-4" key={artisan.id}>
                                <ArtisanCard artisan={artisan} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
