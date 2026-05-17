import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import setContent from "../pages/home/setContent.js";
import isAuthenticated from "../utils/checkAuth.js";
import getUser from "../utils/fetchUserDetails.js";

function HeroSection({ randomContent, pageReload, refresh }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const userFetch = async () => {
        if (isAuthenticated()) {
            const userDetails = await getUser(navigate, toast);

            if (userDetails.user.savedContents?.includes(randomContent?._id)) {
                setBtnDisplay(false);
            }
            else{
                setBtnDisplay(true);
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
                refresh((prev) => prev + 1)
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        userFetch();
    }, [randomContent?._id, pageReload])

    return (
        <div className="hero-wrapper">
            <div className="hero-background">
                <img
                    src={randomContent?.posterUrl?.horizontal}
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
                        FEATURED {randomContent?.contentType === 'movie' ? 'MOVIE' : 'SERIES'}
                    </div>
                    <h1 className="hero-title">
                        {randomContent?.title || 'Welcome to SastaMovies'}
                    </h1>
                    <p className="hero-desc">
                        {randomContent?.description || 'Your premium hub to stream the future.'}
                    </p>
                    <div className="hero-meta">
                        <span>{randomContent?.release?.slice(-4) || 'Stream'}</span> • {randomContent?.genre?.join(', ') || 'Chill'} • {randomContent?.runtime !== 'N/A' ? randomContent?.runtime : randomContent?.contentIds?.length + " Seasons"  || 'Repeat'}
                    </div>
                    <div className="hero-buttons" style={{display : randomContent ? 'flex' : "none"}}>
                        <button className="btn-hero" onClick={() => navigate(`/player/${randomContent?._id}`)}>
                            <i className="bi bi-play-fill fst-normal"> Watch Now</i>
                        </button>
                        {
                            btnDisplay ? (
                                <button className="btn-hero-outline d-flex gap-2" disabled={loading} onClick={() => handleSet(randomContent?._id)}>
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
                                <button className="btn-hero-outline d-flex gap-2" disabled={loading} onClick={() => handleSet(randomContent?._id)}>
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
