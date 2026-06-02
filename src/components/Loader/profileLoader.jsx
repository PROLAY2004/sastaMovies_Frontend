import '../../styles/loader.scss';

function ProfileLoader({ loading }) {
    if (!loading) return null;

    return (
        <main className="profile-content profile-skeleton">
            <div className="profile-header-bar">
                <div className="greeting-block">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>

                <div className="logout-btn skeleton-btn"></div>
            </div>

            <div className="profile-card-modern">
                <div className="profile-row">
                    <div className="profile-identity">
                        <div className="avatar-circle skeleton-avatar"></div>

                        <div className="name-email">
                            <div className="skeleton skeleton-name"></div>
                            <div className="skeleton skeleton-email"></div>
                        </div>
                    </div>

                    <div className="edit-profile-action skeleton-btn"></div>
                </div>

                <div className="stats-grid">
                    {[...Array(4)].map((_, index) => (
                        <div className="stat-chip skeleton-stat" key={index}>
                            <div className="skeleton skeleton-stat-label"></div>
                            <div className="skeleton skeleton-stat-value"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="watchlist-header">
                <div className="skeleton skeleton-watchlist-title"></div>
                <div className="clear-all-btn skeleton-btn"></div>
            </div>

            <div className="movies-grid">
                {[...Array(6)].map((_, index) => (
                    <div className="movie-card skeleton-movie-card" key={index}>
                        <div className="movie-poster-wrapper">
                            <div className="skeleton skeleton-poster"></div>
                        </div>

                        <div className="movie-info">
                            <div className="skeleton skeleton-movie-title"></div>

                            <div className="movie-meta">
                                <div className="skeleton skeleton-meta"></div>
                                <div className="skeleton skeleton-meta small"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default ProfileLoader;