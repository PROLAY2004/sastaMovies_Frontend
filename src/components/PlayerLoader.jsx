import '../styles/loader.scss';

function PlayerLoader({ loading }) {
    return (
        <div
            className="series-player-skeleton"
            style={{ display: loading ? 'block' : 'none' }}>

            <div className="player-container py-4">
                <div className="player-layout">

                    <div className="video-section">

                        <div className="skeleton skeleton-video"></div>

                        <div className="series-content-box mt-4">

                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                                <div>
                                    <div className="skeleton skeleton-player-title"></div>
                                    <div className="skeleton skeleton-player-subtitle"></div>
                                </div>

                                <div className="skeleton skeleton-season-dropdown"></div>
                            </div>

                            <div className="skeleton skeleton-player-desc"></div>
                            <div className="skeleton skeleton-player-desc short"></div>

                            <div className="episode-wrapper mt-4">
                                <div className="skeleton skeleton-episode-heading"></div>

                                <div className="episode-list mt-3">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div
                                            key={item}
                                            className="skeleton skeleton-episode-btn"></div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="imdb-banner-card">

                        <div className="info-section">

                            <div className="skeleton skeleton-poster"></div>

                            <div className="movie-meta mb-4">
                                <div className="skeleton skeleton-meta-card"></div>
                                <div className="skeleton skeleton-meta-card"></div>
                                <div className="skeleton skeleton-meta-card"></div>
                            </div>

                            <div className="movie-details-grid">
                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>

                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>

                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>

                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>

                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>

                                <div className="skeleton skeleton-detail-label"></div>
                                <div className="skeleton skeleton-detail-value"></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PlayerLoader;