function StarRating({ note }) {
    const full = Math.floor(note);
    const half = note - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return (
        <span className="star-rating" aria-label={`Note : ${note} sur 5`}>
            {'★'.repeat(full)}
            {half ? '½' : ''}
            {'☆'.repeat(empty)}
            <span className="note-value">{note}</span>
        </span>
    );
}

export default StarRating;
