import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import isAuthenticated from '../utils/checkAuth.js';
import getUser from '../utils/fetchUserDetails.js';
import setContent from '../pages/home/setContent.js';

function SeriesCards(cardDetails) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnDisplay, setBtnDisplay] = useState(true);

    const userFetch = async () => {
        if (isAuthenticated()) {
            const userDetails = await getUser(navigate, toast);

            if (userDetails.user.savedContents?.includes(cardDetails.series?._id)) {
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
                cardDetails.refresh((prev) => prev + 1)
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        userFetch();
    }, [cardDetails.series?._id, cardDetails.pageReload])

    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3">
            <div className="movie-card">
                <img src={cardDetails.series?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&s'} className="card-img-top" alt="${item.title}" loading="lazy" />
                <div className="card-body">
                    <h5 className="card-title text-truncate">{cardDetails.series?.title}</h5>
                    <div className="card-info-row">
                        <div className="rating-hd-group d-flex gap-3 w-100 justify-content-between">
                            <div>
                                <span className="hd-icon me-2">HD</span>
                                <span className="card-year">{cardDetails.series?.release?.slice(-4) || 'Year'}</span>
                            </div>
                            {cardDetails.series?.rating}
                        </div>
                    </div>
                    <div className="card-buttons">
                        <button className="btn-watch-sm watch-now-btn" onClick={() => navigate(`/player/${cardDetails.series?._id}`)} ><i className="bi bi-play-fill"></i> Watch</button>

                        {
                            btnDisplay ? (
                                <button className="btn-later-sm watch-later-btn" disabled={loading} onClick={() => handleSet(cardDetails.series?._id)}>
                                    {loading ? (
                                        <>
                                            <div
                                                className="spinner-border"
                                                role="status"
                                                style={{ width: '20px', height: '20px' }}></div>{' '}
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-bookmark"></i>
                                            <span className="d-none d-sm-block align-items-center">Later</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button className="btn-later-sm watch-later-btn" disabled={loading} onClick={() => handleSet(cardDetails.series?._id)}>
                                    {loading ? (
                                        <>
                                            <div
                                                className="spinner-border"
                                                role="status"
                                                style={{ width: '20px', height: '20px' }}></div>{' '}
                                            Removing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-bookmark-fill"></i>
                                            <span className="d-none d-sm-block align-items-center">Saved</span>
                                        </>
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

export default SeriesCards;
