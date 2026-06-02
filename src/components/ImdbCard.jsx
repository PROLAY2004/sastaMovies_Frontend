function ImdbCard({contentData}) {
    return (
        <div className="imdb-banner-card">
            <div className="info-section">
                <img
                    src={contentData?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s'}
                    alt={contentData?.title ? `${contentData.title} Poster` : 'Movie Poster'}
                    className="movie-poster"
                />

                <div className="movie-meta mb-4">
                    <div className="meta-item">
                        <i className="bi bi-star-fill"></i>
                        <span>{contentData?.rating || 'N/A'} IMDb</span>
                    </div>
                    <div className="meta-item">
                        <i className="bi bi-clock"></i>
                        <span>{contentData?.runtime || 'N/A'}</span>
                    </div>
                    <div className="meta-item">
                        <i className="bi bi-calendar-event"></i>
                        <span>{contentData?.release?.slice(-4) || 'N/A'}</span>
                    </div>
                </div>

                <div className="movie-details-grid">
                    <div className="detail-label">Genre:</div>
                    <div className="detail-value">{contentData?.genre?.join(', ') || 'N/A'}</div>

                    <div className="detail-label">Director:</div>
                    <div className="detail-value">{contentData?.directors?.join(', ') || 'N/A'}</div>

                    <div className="detail-label">Cast:</div>
                    <div className="detail-value">{contentData?.cast?.join(', ') || 'N/A'}</div>

                    <div className="detail-label">Release Date:</div>
                    <div className="detail-value">{contentData?.release || 'N/A'}</div>

                    <div className="detail-label">Country:</div>
                    <div className="detail-value">{contentData?.country || 'N/A'}</div>

                    <div className="detail-label">Language:</div>
                    <div className="detail-value">{contentData?.language || 'N/A'}</div>
                </div>
            </div>
        </div>
    );
}

export default ImdbCard;
