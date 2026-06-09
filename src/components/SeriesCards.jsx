import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import isAuthenticated from '../utils/checkAuth.js';
import setContent from '../pages/home/setContent.js';

function SeriesCards({ series, refresh, LoginRequiredModal, savedContents }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const handleWatch = () => {
        if (!isAuthenticated()) {
            localStorage.setItem('postLoginRedirect', `/player/${series?._id}`);
            LoginRequiredModal(true);
        } else {
            navigate(`/player/${series?._id}`);
        }
    }

    const handleSet = async (e, contentId) => {
        e.stopPropagation();

        if (!isAuthenticated()) {
            toast.error('Please log in to save.', { position: 'top-right', theme: 'dark' });
            return; // Stop execution
        }

        // OPTIMISTIC UPDATE: Instantly flip the button for immediate visual feedback
        setBtnDisplay((prev) => !prev);
        setLoading(true);

        const isSuccess = await setContent(navigate, toast, contentId);

        if (isSuccess) {
            // Trigger the parent to silently update the background array
            refresh((prev) => prev + 1);
        } else {
            // If API fails, revert the button back
            setBtnDisplay((prev) => !prev);
        }

        setLoading(false);
    }

    // Cleaned up dependency array: only watch the series ID and the saved array
    useEffect(() => {
        if (savedContents?.includes(series?._id)) {
            setBtnDisplay(false);
        } else {
            setBtnDisplay(true);
        }
    }, [series?._id, savedContents]);

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="movie-card" onClick={handleWatch}>
                <div className="card-img-wrapper">
                    <img
                        src={series?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&s'}
                        className="card-img-top"
                        alt={series?.title}
                        loading="lazy"
                    />
                    <div className="hover-play-btn">
                        <i className="bi bi-play-fill ps-1"></i>
                    </div>
                </div>

                <div className="card-body">
                    <div className="card-header-row">
                        <h5 className="card-title">{series?.title}</h5>
                        <button className={`action-save-btn ${!btnDisplay ? 'saved' : ''}`} disabled={loading} onClick={(e) => handleSet(e, series?._id)} title="Save to list">
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : <i className={btnDisplay ? "bi bi-bookmark" : "bi bi-bookmark-fill"}></i>}
                        </button>
                    </div>
                    <div className="card-info-row">
                        <span>{series?.release?.slice(-4) || 'Year'}</span>
                        <span>•</span>
                        <span className="rating-badge">
                            <i className="bi bi-star-fill text-warning" style={{ fontSize: '0.7rem' }}></i>
                            {series?.rating || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeriesCards;