import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisan, sendContact } from '../services/api';
import StarRating from '../components/StarRating';

const INITIAL_FORM = { nom: '', email: '', objet: '', message: '' };

function ArtisanDetail() {
    const { id } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState(INITIAL_FORM);
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        getArtisan(id)
            .then((data) => {
                setArtisan(data);
                document.title = `${data.nom} — Trouve ton artisan`;
                document.querySelector('meta[name="description"]')?.setAttribute(
                    'content',
                    `Contactez ${data.nom}, artisan ${data.specialite?.nom ?? ''} à ${data.ville}.`
                );
                setLoading(false);
            })
            .catch(() => { setNotFound(true); setLoading(false); });
    }, [id]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormError('');
        setSending(true);
        try {
            await sendContact({ ...form, artisan_id: parseInt(id, 10) });
            setSuccess(true);
            setForm(INITIAL_FORM);
        } catch (err) {
            setFormError(err.message || "Une erreur est survenue.");
        } finally {
            setSending(false);
        }
    }

    if (loading) return <main id="main-content"><div className="container py-5"><p>Chargement…</p></div></main>;

    if (notFound) {
        return (
            <main id="main-content">
                <div className="container py-5 text-center">
                    <p>Artisan introuvable.</p>
                    <Link to="/" className="btn btn-home mt-3">Retour à l'accueil</Link>
                </div>
            </main>
        );
    }

    const specialite = artisan.specialite?.nom ?? '';
    const imageSrc = artisan.image ? artisan.image : null;

    return (
        <main id="main-content">
            <div className="container artisan-detail">
                {/* En-tête artisan */}
                <div className="row g-4 mb-4">
                    <div className="col-12 col-md-4">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={`Photo de ${artisan.nom}`}
                                className="artisan-image"
                            />
                        ) : (
                            <div
                                className="artisan-image d-flex align-items-center justify-content-center"
                                role="img"
                                aria-label={`Photo de ${artisan.nom} non disponible`}
                            >
                                <span style={{ fontSize: '4rem' }}>🔨</span>
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-8">
                        <h1 className="artisan-name">{artisan.nom}</h1>
                        <StarRating note={parseFloat(artisan.note)} />
                        {specialite && <p className="artisan-meta mt-1">{specialite}</p>}
                        <p className="artisan-meta">📍 {artisan.ville}</p>
                        {artisan.site_web && (
                            <p className="artisan-meta">
                                🌐{' '}
                                <a
                                    href={artisan.site_web}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {artisan.site_web.replace(/^https?:\/\//, '')}
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* À propos */}
                {artisan.a_propos && (
                    <section className="artisan-about mb-4">
                        <h2>À propos</h2>
                        <p>{artisan.a_propos}</p>
                    </section>
                )}

                {/* Formulaire de contact */}
                <section className="contact-form-section" aria-labelledby="contact-title">
                    <h2 id="contact-title">Contacter cet artisan</h2>

                    {success && (
                        <div className="alert alert-success" role="alert">
                            Votre message a bien été envoyé. L'artisan vous répondra sous 48h.
                        </div>
                    )}
                    {formError && (
                        <div className="alert alert-danger" role="alert">{formError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="contact-nom" className="form-label">Nom *</label>
                                <input
                                    id="contact-nom"
                                    name="nom"
                                    type="text"
                                    className="form-control"
                                    value={form.nom}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="contact-email" className="form-label">Email *</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="contact-objet" className="form-label">Objet *</label>
                                <input
                                    id="contact-objet"
                                    name="objet"
                                    type="text"
                                    className="form-control"
                                    value={form.objet}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="contact-message" className="form-label">Message *</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    className="form-control"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-send"
                                    disabled={sending}
                                >
                                    {sending ? 'Envoi en cours…' : 'Envoyer'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default ArtisanDetail;
