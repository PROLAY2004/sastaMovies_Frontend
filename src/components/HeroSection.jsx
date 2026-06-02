// HeroSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import setContent from "../pages/home/setContent.js";
import isAuthenticated from "../utils/checkAuth.js";
import getUser from "../utils/fetchUserDetails.js";

function HeroSection({ randomContent, pageReload, refresh, LoginRequiredModal }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const handleWatch = () => {
        if (!isAuthenticated()) {
            LoginRequiredModal(true);
        }
        else {
            navigate(`/player/${randomContent?._id}`);
        }
    }

    const userFetch = async () => {
        if (isAuthenticated()) {
            const userDetails = await getUser(navigate, toast);

            if (userDetails.user.savedContents?.includes(randomContent?._id)) {
                setBtnDisplay(false);
            }
            else {
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
        <div className="hero-wrapper position-relative w-100 overflow-hidden">
            <div className="hero-background position-absolute top-0 start-0 w-100 h-100">
                <img
                    src={randomContent?.posterUrl?.horizontal}
                    alt="hero background"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'brightness(0.4) contrast(1.1)' }}
                />
            </div>
            <div className="hero-gradient position-absolute top-0 start-0 w-100 h-100"></div>
            <div className="hero-content position-relative h-100 d-flex align-items-center">
                <div className="container px-4 px-lg-0">
                    <div className="row justify-content-start">
                        <div className="col-12 col-lg-7 col-xl-6">
                            <div className="hero-text">
                                <div className="featured-badge d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded-pill" style={{ background: 'rgba(245, 184, 27, 0.12)', backdropFilter: 'blur(4px)' }}>
                                    <i className="bi bi-star-fill" style={{ fontSize: '0.7rem', color: '#f5b81b' }}></i>
                                    <span className="small fw-semibold" style={{ color: '#f5b81b', letterSpacing: '0.5px' }}>
                                        FEATURED {randomContent?.contentType === 'movie' ? 'MOVIE' : 'SERIES'}
                                    </span>
                                </div>
                                <h1 className="hero-title display-4 fw-bold mb-3" style={{ lineHeight: 1.1, letterSpacing: '-1px' }}>
                                    {randomContent?.title || 'Welcome to SastaMovies'}
                                </h1>
                                <p className="hero-desc mb-4" style={{ color: '#cccccc', fontSize: '1rem', lineHeight: 1.5 }}>
                                    {randomContent?.description || 'Your premium hub to stream the future.'}
                                </p>
                                <div className="hero-meta d-flex flex-wrap gap-3 mb-4 small">
                                    <span className="d-flex align-items-center gap-1">
                                        <i className="bi bi-calendar3" style={{ color: '#f5b81b' }}></i>
                                        <span>{randomContent?.release?.slice(-4) || 'Stream'}</span>
                                    </span>
                                    <span className="d-flex align-items-center gap-1">
                                        <i className="bi bi-tag" style={{ color: '#f5b81b' }}></i>
                                        <span>{randomContent?.genre?.join(', ') || 'Chill'}</span>
                                    </span>
                                    <span className="d-flex align-items-center gap-1">
                                        <i className="bi bi-clock" style={{ color: '#f5b81b' }}></i>
                                        <span>{randomContent?.runtime !== 'N/A' ? randomContent?.runtime : randomContent?.contentIds?.length + " Seasons" || 'Repeat'}</span>
                                    </span>
                                </div>
                                <div className="hero-buttons d-flex flex-wrap gap-3" style={{ display: randomContent ? 'flex' : "none" }}>
                                    <button className="btn-hero d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold border-0" onClick={handleWatch} style={{ background: '#f5b81b', color: '#000000', transition: 'all 0.2s ease' }}>
                                        <i className="bi bi-play-fill"></i> Watch Now
                                    </button>
                                    {
                                        btnDisplay ? (
                                            <button className="btn-hero-outline d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold" disabled={loading} onClick={() => handleSet(randomContent?._id)} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', transition: 'all 0.2s ease' }}>
                                                {loading ? (
                                                    <>
                                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-clock"></i> Watch Later
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <button className="btn-hero-outline d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold" disabled={loading} onClick={() => handleSet(randomContent?._id)} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', transition: 'all 0.2s ease' }}>
                                                {loading ? (
                                                    <>
                                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                                        <span>Removing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-check-circle"></i> Saved
                                                    </>
                                                )}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;