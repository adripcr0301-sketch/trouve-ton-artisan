import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const q = query.trim();
        if (q) {
            navigate(`/recherche?q=${encodeURIComponent(q)}`);
            setQuery('');
        }
    }

    return (
        <form
            className="search-form d-flex"
            role="search"
            aria-label="Rechercher un artisan"
            onSubmit={handleSubmit}
        >
            <label htmlFor="search-input" className="visually-hidden">
                Rechercher un artisan
            </label>
            <input
                id="search-input"
                type="search"
                className="form-control"
                placeholder="Rechercher un artisan…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher un artisan"
            />
            <button type="submit" className="btn btn-search" aria-label="Lancer la recherche">
                🔍
            </button>
        </form>
    );
}

export default SearchBar;
