const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
};

export async function getCategories() {
    const res = await fetch(`${API_URL}/api/categories`, { headers });
    if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
    return res.json();
}

export async function getArtisans(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}/api/artisans${query ? '?' + query : ''}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Erreur lors du chargement des artisans');
    return res.json();
}

export async function searchArtisans(q) {
    const res = await fetch(`${API_URL}/api/artisans/search?q=${encodeURIComponent(q)}`, { headers });
    if (!res.ok) throw new Error('Erreur lors de la recherche');
    return res.json();
}

export async function getArtisan(id) {
    const res = await fetch(`${API_URL}/api/artisans/${id}`, { headers });
    if (!res.ok) throw new Error('Artisan introuvable');
    return res.json();
}

export async function sendContact(data) {
    const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erreur lors de l'envoi");
    return json;
}
