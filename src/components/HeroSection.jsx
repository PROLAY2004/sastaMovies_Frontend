import { toast } from "react-toastify";
import isAuthenticated from "../utils/checkAuth.js";

function HeroSection(randomContent) {

    const saveContent = () => {
            if (!isAuthenticated()) {
                toast.error('Please Login to save Content', {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                });
            }
        }

    return (
        <div className="hero-wrapper">
            <div className="hero-background">
                <img
                    src={randomContent.randomContent?.posterUrl?.horizontal}
                    alt="hero background"
                />
            </div>
            <div className="hero-gradient"></div>
            <div className="hero-content">
                <div className="hero-text">
                    <div className="featured-badge">
                        <i
                            className="bi bi-star-fill me-1"
                            style={{ fontSize: '0.65rem' }}></i>{' '}
                        FEATURED {randomContent.randomContent?.contentType === 'movie' ? 'MOVIE' : 'SERIES'}
                    </div>
                    <h1 className="hero-title" id="heroTitle">
                        {randomContent.randomContent?.title}
                    </h1>
                    <p className="hero-desc" id="heroDesc">
                        {randomContent.randomContent?.description}
                    </p>
                    <div className="hero-meta" id="heroMeta">
                        <span>{randomContent.randomContent?.release?.slice(-4)}</span> • {randomContent.randomContent?.genre?.join(', ')} • {randomContent.randomContent?.runtime}
                    </div>
                    <div className="hero-buttons">
                        <button className="btn-hero" id="heroWatchNow">
                            <i className="bi bi-play-fill"></i> Watch Now
                        </button>
                        <button className="btn-hero-outline" onClick={() => saveContent()}>
                            <i className="bi bi-clock"></i> Watch Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
