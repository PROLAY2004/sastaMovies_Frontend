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

                {[1, 2].map((sectionIndex) => (
                    <div className="container px-4 py-4" key={sectionIndex}>
                        <div className="d-flex justify-content-between align-items-end mb-4">
                            <div className="skeleton" style={{ width: '150px', height: '24px' }}></div>
                            <div className="skeleton" style={{ width: '50px', height: '16px' }}></div>
                        </div>

                        <div className="row g-4">
                            {[...Array(6)].map((_, index) => (
                                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
                                    <div style={{ aspectRatio: '2/3', background: '#111', borderRadius: '8px', marginBottom: '12px' }} className="skeleton"></div>
                                    <div className="skeleton mb-2" style={{ width: '80%', height: '14px' }}></div>
                                    <div className="skeleton" style={{ width: '40%', height: '12px' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

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