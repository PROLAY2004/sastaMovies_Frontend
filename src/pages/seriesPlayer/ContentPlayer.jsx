import { useState } from 'react';
import { useParams } from "react-router-dom";
import '../../styles/player.scss';

function ContentPlayer() {
    const { contentId } = useParams();

    console.log(contentId);

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
            <div className="player-container py-4">
                <div className="player-layout">
                    <div className="video-section">
                        <div className="video-player-wrapper">
                            <video
                                className="video-player"
                                controls
                                poster="https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg">
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
                                        Breaking Bad
                                    </h1>
                                    <p className="series-subtitle mb-0">
                                        Crime • Drama • Thriller
                                    </p>
                                </div>

                                <div className="season-dropdown">
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
                                A high school chemistry teacher diagnosed with cancer starts manufacturing crystal meth with a former student in order to secure his family's future.
                            </p>

                            <div className="episode-wrapper mt-4">
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
                                src="https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
                                alt="Breaking Bad Poster"
                                className="movie-poster"
                            />

                            <div className="movie-meta">
                                <div className="meta-item">
                                    <i className="bi bi-star-fill"></i>
                                    <span>9.5 IMDb</span>
                                </div>

                                <div className="meta-item">
                                    <i className="bi bi-clock"></i>
                                    <span>58 min</span>
                                </div>

                                <div className="meta-item">
                                    <i className="bi bi-calendar-event"></i>
                                    <span>2008</span>
                                </div>
                            </div>

                            <div className="movie-details-grid">
                                <div className="detail-label">Genre:</div>
                                <div className="detail-value">
                                    Crime, Drama, Thriller
                                </div>

                                <div className="detail-label">Director:</div>
                                <div className="detail-value">
                                    Vince Gilligan
                                </div>

                                <div className="detail-label">Cast:</div>
                                <div className="detail-value">
                                    Bryan Cranston, Aaron Paul, Anna Gunn
                                </div>

                                <div className="detail-label">Release Date:</div>
                                <div className="detail-value">
                                    20 Jan 2008
                                </div>

                                <div className="detail-label">Country:</div>
                                <div className="detail-value">
                                    United States
                                </div>

                                <div className="detail-label">Language:</div>
                                <div className="detail-value">
                                    English
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