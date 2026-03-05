import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function ArtisanCard({ artisan }) {
    const specialite = artisan.specialite?.nom ?? '';

    return (
        <Link
            to={`/artisans/${artisan.id}`}
            className="artisan-card"
            aria-label={`Voir la fiche de ${artisan.nom}`}
        >
            <div className="card-body">
                <p className="card-title">{artisan.nom}</p>
                <StarRating note={parseFloat(artisan.note)} />
                {specialite && <p className="card-specialite mt-1">{specialite}</p>}
                <p className="card-ville">{artisan.ville}</p>
            </div>
        </Link>
    );
}

export default ArtisanCard;
