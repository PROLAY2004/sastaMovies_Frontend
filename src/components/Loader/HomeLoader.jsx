import '../../styles/loader.scss';

function HomeLoader({ loading }) {
    if (!loading) return null;

    return (
        <>
            <div className="home-skeleton">
                {/* HERO */}
                <div className="hero-wrapper skeleton-hero">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="skeleton skeleton-badge"></div>

                            <div className="skeleton skeleton-hero-title"></div>

                            <div className="skeleton skeleton-desc"></div>
                            <div className="skeleton skeleton-desc short"></div>

                            <div className="skeleton skeleton-meta-line"></div>

                            <div className="hero-buttons">
                                <div className="skeleton skeleton-hero-btn"></div>
                                <div className="skeleton skeleton-hero-btn outline"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOVIES */}
                <div className="container py-3">
                    <div className="section-header">
                        <div className="skeleton skeleton-section-title"></div>
                        <div className="skeleton skeleton-link"></div>
                    </div>

                    <div className="row g-4">
                        {[...Array(8)].map((_, index) => (
                            <div
                                className="col-6 col-sm-6 col-md-4 col-lg-3"
                                key={index}>
                                <div className="movie-card skeleton-card">
                                    <div className="skeleton skeleton-card-img"></div>

                                    <div className="card-body">
                                        <div className="skeleton skeleton-card-title"></div>

                                        <div className="skeleton skeleton-card-meta"></div>

                                        <div className="card-buttons">
                                            <div className="skeleton skeleton-card-btn"></div>
                                            <div className="skeleton skeleton-card-btn small"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SERIES */}
                <div className="container py-3">
                    <div className="section-header">
                        <div className="skeleton skeleton-section-title"></div>
                        <div className="skeleton skeleton-link"></div>
                    </div>

                    <div className="row g-4">
                        {[...Array(4)].map((_, index) => (
                            <div
                                className="col-6 col-sm-6 col-md-4 col-lg-3"
                                key={index}>
                                <div className="movie-card skeleton-card">
                                    <div className="skeleton skeleton-card-img"></div>

                                    <div className="card-body">
                                        <div className="skeleton skeleton-card-title"></div>

                                        <div className="skeleton skeleton-card-meta"></div>

                                        <div className="card-buttons">
                                            <div className="skeleton skeleton-card-btn"></div>
                                            <div className="skeleton skeleton-card-btn small"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="container my-5">
                    <div className="skeleton-cta">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <div className="skeleton skeleton-cta-title"></div>
                                <div className="skeleton skeleton-cta-text"></div>
                            </div>

                            <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                <div className="skeleton skeleton-cta-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeLoader;