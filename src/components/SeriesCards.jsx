import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import isAuthenticated from '../utils/checkAuth.js';
import getUser from '../utils/fetchUserDetails.js';
import setContent from '../pages/home/setContent.js';

function SeriesCards(cardDetails) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const handleWatch = () => {
        if (!isAuthenticated()) {
            localStorage.setItem('postLoginRedirect', `/player/${cardDetails.series?._id}`);
            cardDetails.LoginRequiredModal(true);
        } else {
            navigate(`/player/${cardDetails.series?._id}`);
        }
    }


    const handleSet = async (e, contentId) => {
        e.stopPropagation();
        setLoading(true);

        if (!isAuthenticated()) {
            toast.error('Please log in to save.', { position: 'top-right', theme: 'dark' });
        } else {
            const isSuccess = await setContent(navigate, toast, contentId)

            if (isSuccess) {
                setBtnDisplay(!btnDisplay);
                cardDetails.refresh((prev) => prev + 1)
            }
        }
        
        setLoading(false);
    }

    useEffect(() => {
        if (cardDetails.savedContents?.includes(cardDetails.series?._id)) {
            setBtnDisplay(false);
        }
        else {
            setBtnDisplay(true);
        }
    }, [cardDetails.series?._id, cardDetails.pageReload, cardDetails.savedContents])

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="movie-card" onClick={handleWatch}>
                <div className="card-img-wrapper">
                    <img
                        src={cardDetails.series?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&s'}
                        className="card-img-top"
                        alt={cardDetails.series?.title}
                        loading="lazy"
                    />
                    <div className="hover-play-btn">
                        <i className="bi bi-play-fill ps-1"></i>
                    </div>
                </div>

                <div className="card-body">
                    <div className="card-header-row">
                        <h5 className="card-title">{cardDetails.series?.title}</h5>
                        <button className={`action-save-btn ${!btnDisplay ? 'saved' : ''}`} disabled={loading} onClick={(e) => handleSet(e, cardDetails.series?._id)} title="Save to list">
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : <i className={btnDisplay ? "bi bi-bookmark" : "bi bi-bookmark-fill"}></i>}
                        </button>
                    </div>
                    <div className="card-info-row">
                        <span>{cardDetails.series?.release?.slice(-4) || 'Year'}</span>
                        <span>•</span>
                        <span className="rating-badge">
                            <i className="bi bi-star-fill text-warning" style={{ fontSize: '0.7rem' }}></i>
                            {cardDetails.series?.rating || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeriesCards;