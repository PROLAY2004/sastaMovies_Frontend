import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import '../../styles/player.scss';
import configaruration from '../../config/config.js';
import displayPlayer from './fetchContent.js';
import isAuthenticated from '../../utils/checkAuth.js';
import PlayerLoader from '../../components/PlayerLoader.jsx'

function ContentPlayer() {
    const navigate = useNavigate();
    const { contentId } = useParams();
    const [loading, setLoading] = useState(true);
    const [seasonIndex, setSeasonIndex] = useState(0);
    const [episodeIndex, setEpisodeIndex] = useState(0);
    const [contentData, setContentData] = useState({});
    const [episodes, setEpisodes] = useState([]);

    const handleDisplay = async () => {
        const isSuccess = await displayPlayer(navigate, toast, contentId);

        if (isSuccess) {
            setLoading(false);
            setContentData(isSuccess.contentInfo);

            console.log(isSuccess)
        }
    }

    useEffect(() => {
        handleDisplay();
    }, [contentId]);

    useEffect(() => {
        if (contentData.contentType === 'series') {
            setEpisodes(contentData?.contentIds[seasonIndex] || []);
        }
    }, [contentData, seasonIndex]);

    return (
        <main className="player-page">
            <nav className="player-navbar">
                <div className="player-nav-container">
                    <h2 className="logo-text">
                        Sasta<span>Movies</span>
                    </h2>
                </div>
            </nav>

            <PlayerLoader loading={loading} />

            <div className="player-container py-4" style={{ display: loading ? 'none' : 'block' }}>
                <div className="player-layout">
                    <div className="video-section">
                        <div className="video-player-wrapper">
                            {isAuthenticated() ? (
                                <video
                                    key={`${contentId}-${seasonIndex}-${episodeIndex}`}
                                    className="video-player"
                                    controls
                                    crossOrigin="anonymous"
                                    poster={contentData?.posterUrl?.horizontal || '{}'}>

                                    <source
                                        src={`${configaruration.BASE_URL}/user/stream/${contentId}?season=${seasonIndex}&episode=${episodeIndex}`}
                                        type="video/mp4"
                                    />

                                    {contentData?.subtitles?.[seasonIndex]?.[episodeIndex] && (
                                        <track
                                            src={contentData?.subtitles?.[seasonIndex]?.[episodeIndex]}
                                            kind="subtitles"
                                            srcLang="en"
                                            label="English"
                                            default
                                        />
                                    )}

                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                // FALLBACK UI IF NOT LOGGED IN
                                <video
                                    className="video-player"
                                    controls
                                    poster={contentData?.posterUrl?.horizontal || '{}'}>

                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        <div className="series-content-box mt-4">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                                <div>
                                    <h1 className="series-title mb-2">
                                        {contentData?.title || 'Content Title'}
                                    </h1>
                                    <p className="series-subtitle mb-0">
                                        {contentData?.genre?.join(' • ') || 'Genre'}
                                    </p>
                                </div>

                                <div className="season-dropdown" style={{ display: contentData?.contentType === 'series' ? 'block' : 'none' }}>
                                    <label className="dropdown-label">
                                        Season
                                    </label>
                                    <select
                                        value={seasonIndex}
                                        onChange={(e) => {
                                            setSeasonIndex(parseInt(e.target.value));
                                            setEpisodeIndex(0);
                                        }}
                                        className="season-select">
                                        {contentData?.contentIds?.map((_, i) => (
                                            <option key={contentData._id + i} value={i}>Season {i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <p className="series-description">
                                {contentData?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                            </p>

                            <div className="episode-wrapper mt-4" style={{ display: contentData?.contentType === 'series' ? 'block' : 'none' }}>
                                <h4 className="episode-heading mb-3">
                                    Episodes
                                </h4>

                                <div className="episode-list">
                                    {episodes.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setEpisodeIndex(index)}
                                            className={`episode-btn ${episodeIndex === index
                                                ? 'active'
                                                : ''
                                                }`}>
                                            EP {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="imdb-banner-card">
                        <div className="info-section">
                            <img
                                src={contentData?.posterUrl?.vertical || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s'}
                                alt={contentData?.title ? `${contentData.title} Poster` : 'Movie Poster'}
                                className="movie-poster"
                            />

                            <div className="movie-meta mb-4">
                                <div className="meta-item">
                                    <i className="bi bi-star-fill"></i>
                                    <span>{contentData?.rating || 'N/A'} IMDb</span>
                                </div>

                                <div className="meta-item">
                                    <i className="bi bi-clock"></i>
                                    <span>{contentData?.runtime || 'N/A'}</span>
                                </div>

                                <div className="meta-item">
                                    <i className="bi bi-calendar-event"></i>
                                    <span>{contentData?.release || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="movie-details-grid">
                                <div className="detail-label">Genre:</div>
                                <div className="detail-value">
                                    {contentData?.genre?.join(', ') || 'N/A'}
                                </div>

                                <div className="detail-label">Director:</div>
                                <div className="detail-value">
                                    {contentData?.directors?.join(', ') || 'N/A'}
                                </div>

                                <div className="detail-label">Cast:</div>
                                <div className="detail-value">
                                    {contentData?.cast?.join(', ') || 'N/A'}
                                </div>

                                <div className="detail-label">Release Date:</div>
                                <div className="detail-value">
                                    {contentData?.release || 'N/A'}
                                </div>

                                <div className="detail-label">Country:</div>
                                <div className="detail-value">
                                    {contentData?.country || 'N/A'}
                                </div>

                                <div className="detail-label">Language:</div>
                                <div className="detail-value">
                                    {contentData?.language || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContentPlayer;