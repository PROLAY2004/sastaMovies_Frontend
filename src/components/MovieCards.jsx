import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import isAuthenticated from '../utils/checkAuth.js';
import getUser from '../utils/fetchUserDetails.js';
import setContent from '../pages/home/setContent.js';

function MovieCards(cardDetails) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const handleWatch = () => {
        if (!isAuthenticated()) {
            localStorage.setItem('postLoginRedirect', `/player/${cardDetails.movie?._id}`);
            cardDetails.LoginRequiredModal(true);
        } else {
            navigate(`/player/${cardDetails.movie?._id}`);
        }
    }

    const userFetch = async () => {
        if (isAuthenticated()) {
            const userDetails = await getUser(navigate, toast);
            if (userDetails.user.savedContents?.includes(cardDetails.movie?._id)) {
                setBtnDisplay(false);
            } else {
                setBtnDisplay(true);
            }
        }
    }

    const handleSet = async (e, contentId) => {
        e.stopPropagation(); // Prevents clicking the card background
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
        userFetch();
    }, [cardDetails.movie?._id, cardDetails.pageReload])

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="movie-card" onClick={handleWatch}>
                <div className="card-img-wrapper">
                    <img
                        src={cardDetails.movie?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&s'}
                        className="card-img-top"
                        alt={cardDetails.movie?.title}
                        loading="lazy"
                    />
                    <div className="hover-play-btn">
                        <i className="bi bi-play-fill ps-1"></i>
                    </div>
                </div>

                <div className="card-body">
                    <div className="card-header-row">
                        <h5 className="card-title">{cardDetails.movie?.title}</h5>
                        <button className={`action-save-btn  ${!btnDisplay ? 'saved' : ''}`} disabled={loading} onClick={(e) => handleSet(e, cardDetails.movie?._id)} title="Save to list">
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : <i className={btnDisplay ? "bi bi-bookmark" : "bi bi-bookmark-fill"}></i>}
                        </button>
                    </div>
                    <div className="card-info-row">
                        <span>{cardDetails.movie?.release?.slice(-4) || 'Year'}</span>
                        <span>•</span>
                        <span className="rating-badge">
                            <i className="bi bi-star-fill text-warning" style={{ fontSize: '0.7rem' }}></i>
                            {cardDetails.movie?.rating || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCards;