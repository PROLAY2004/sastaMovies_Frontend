import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import '../../styles/player.scss';
import displayPlayer from './fetchContent.js';
import PlayerLoader from '../../components/PlayerLoader.jsx'

function ContentPlayer() {
    const navigate = useNavigate();
    const { contentId } = useParams();
    const [loading, setLoading] = useState(true);
    const [contentData, setContentData] = useState({});

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

    const [selectedSeason, setSelectedSeason] = useState('1');
    const [selectedEpisode, setSelectedEpisode] = useState('1');

    const episodes = {
        1: ['Episode 1', 'Episode 2', 'Episode 3', 'Episode 4'],
        2: ['Episode 1', 'Episode 2', 'Episode 3'],
    };

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

            <div className="player-container py-4" style={{display : loading ? 'none' : 'block'}}>
                <div className="player-layout">
                    <div className="video-section">
                        <div className="video-player-wrapper">
                            <video
                                className="video-player"
                                controls
                                poster={contentData?.posterUrl?.horizontal || '{}'}>
                                <source
                                    src="/videos/breakingbad-s1ep1.mp4"
                                    type="video/mp4"
                                />

                                <track
                                    src="/subtitles/breakingbad-s1ep1.vtt"
                                    kind="subtitles"
                                    srcLang="en"
                                    label="English"
                                    default
                                />

                                Your browser does not support the video tag.
                            </video>
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
                                        value={selectedSeason}
                                        onChange={(e) => {
                                            setSelectedSeason(e.target.value);
                                            setSelectedEpisode('1');
                                        }}
                                        className="season-select">
                                        <option value="1">Season 1</option>
                                        <option value="2">Season 2</option>
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
                                    {episodes[selectedSeason].map((episode, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedEpisode(String(index + 1))}
                                            className={`episode-btn ${selectedEpisode === String(index + 1)
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