import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

import setContent from '../pages/home/setContent.js'

function ProfileCards(cardDetails) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRemove = async (contentId) => {
        setLoading(true);
        const isSuccess = await setContent(navigate, toast, contentId);
        setLoading(false);

        if (isSuccess) {
            console.log('check')
            cardDetails.pageReload((prev) => {
                return prev + 1;
            });
        }
    }

    return (
        <div className="movie-card" style={{ display: cardDetails.display ? 'none' : 'block' }} >
            <div className="movie-poster-wrapper">
                <img src={cardDetails.savedContent.posterUrl.vertical} className="movie-poster" loading="lazy" onClick={() => navigate(`/player/${cardDetails.savedContent._id}`)} />
                <div className="remove-icon-btn" onClick={() => handleRemove(cardDetails.savedContent._id)}>
                    {loading ? (<div
                        className="spinner-border"
                        role="status"
                        style={{ width: '20px', height: '20px' }}></div>) : (<i className="bi bi-x-lg"></i>)}
                </div>
            </div>
            <div className="movie-info">
                <h4>{cardDetails.savedContent.title}</h4>
                <div className="movie-meta">
                    <span>{cardDetails.savedContent.release.slice(-4)}</span>
                    <span className="movie-rating"><i className="bi bi-star-fill" style={{ fontSize: '0.6rem' }}></i> {cardDetails.savedContent.rating}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCards;
