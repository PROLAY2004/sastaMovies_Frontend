import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import setContent from "../pages/home/setContent.js";
import isAuthenticated from "../utils/checkAuth.js";
import getUser from "../utils/fetchUserDetails.js";

function HeroSection(randomContent) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const userFetch = async () => {
        if (isAuthenticated()) {
            const userDetails = await getUser(navigate, toast);

            if (userDetails.user.savedContents?.includes(randomContent.randomContent?._id)) {
                setBtnDisplay(false);
            }
        }
    }

    const handleSet = async (contentId) => {
        setLoading(true);

        if (!isAuthenticated()) {
            toast.error('Please Login to save Content', {
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
            });
        }
        else {
            const isSuccess = await setContent(navigate, toast, contentId)

            if (isSuccess) {
                setBtnDisplay(!btnDisplay);
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        userFetch();
    }, [randomContent.randomContent?._id])

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
                            <i className="bi bi-play-fill fst-normal"> Watch Now</i>
                        </button>
                        {
                            btnDisplay ? (
                                <button className="btn-hero-outline d-flex gap-2" disabled={loading} onClick={() => handleSet(randomContent.randomContent?._id)}>
                                    {loading ? (
                                        <>
                                            <div
                                                className="spinner-border"
                                                role="status"
                                                style={{ width: '20px', height: '20px' }}></div>{' '}
                                            Saving...
                                        </>
                                    ) : (
                                        <i className="bi bi-clock fst-normal"> Watch Later</i>
                                    )}
                                </button>
                            ) : (
                                <button className="btn-hero-outline d-flex gap-2" disabled={loading} onClick={() => handleSet(randomContent.randomContent?._id)}>
                                    {loading ? (
                                        <>
                                            <div
                                                className="spinner-border"
                                                role="status"
                                                style={{ width: '20px', height: '20px' }}></div>{' '}
                                            Removing...
                                        </>
                                    ) : (
                                        <i className="bi bi-check-circle fst-normal"> Saved</i>
                                    )}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
