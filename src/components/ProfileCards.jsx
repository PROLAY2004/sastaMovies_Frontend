import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isAuthenticated from '../utils/checkAuth.js';

function ProfileCards(cardDetails) {


    return (
        <div className="movie-card" style={{ display: cardDetails.display ? 'none' : 'block' }}>
            <div className="movie-poster-wrapper">
                <img src="https://m.media-amazon.com/images/M/MV5BNmZkZjQ5YzItOGQ0MC00ZmVlLWIxNjgtYzU2MmYzYjFmZWI2XkEyXkFqcGc@._V1_.jpg" className="movie-poster" loading="lazy" />
                <div className="remove-icon-btn">
                    <i className="bi bi-x-lg"></i>
                </div>
            </div>
            <div className="movie-info">
                <h4>Name</h4>
                <div className="movie-meta">
                    <span>Year</span>
                    <span className="movie-rating"><i className="bi bi-star-fill" style={{ fontSize: '0.6rem' }}></i> Rating</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCards;
