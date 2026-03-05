import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getArtisans, getCategories, searchArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

function Category() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');

    const [artisans, setArtisans] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        if (q) {
            // Mode recherche
            const pageTitle = `Résultats pour « ${q} »`;
            setTitle(pageTitle);
            document.title = `${pageTitle} — Trouve ton artisan`;
            document.querySelector('meta[name="description"]')?.setAttribute(
                'content',
                `Artisans correspondant à la recherche "${q}" en région Auvergne-Rhône-Alpes.`
            );
            searchArtisans(q)
                .then((data) => { setArtisans(data); setLoading(false); })
                .catch(() => { setError(true); setLoading(false); });
        } else if (id) {
            // Mode catégorie
            Promise.all([getArtisans(), getCategories()])
                .then(([allArtisans, cats]) => {
                    const cat = cats.find((c) => c.id === parseInt(id, 10));
                    const catName = cat?.nom ?? 'Catégorie';
                    setTitle(catName);
                    document.title = `${catName} — Trouve ton artisan`;
                    document.querySelector('meta[name="description"]')?.setAttribute(
                        'content',
                        `Artisans spécialisés en ${catName} en région Auvergne-Rhône-Alpes.`
                    );
                    const filtered = allArtisans.filter(
                        (a) => a.specialite?.categorie?.id === parseInt(id, 10)
                    );
                    setArtisans(filtered);
                    setLoading(false);
                })
                .catch(() => { setError(true); setLoading(false); });
        }
    }, [id, q]);

    return (
        <main id="main-content">
            <div className="page-title">
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </div>
            <div className="container mb-5">
                {loading && <p aria-live="polite">Chargement…</p>}
                {error && (
                    <p className="text-danger" role="alert">
                        Impossible de charger les artisans.
                    </p>
                )}
                {!loading && !error && artisans.length === 0 && (
                    <p>Aucun artisan trouvé.</p>
                )}
                <div className="row g-3">
                    {artisans.map((artisan) => (
                        <div className="col-12 col-md-6 col-lg-4" key={artisan.id}>
                            <ArtisanCard artisan={artisan} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Category;
