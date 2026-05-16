import { useState } from 'react';
import '../../styles/player.scss';

function SeriesPlayer() {
    const [selectedSeason, setSelectedSeason] = useState('1');
    const [selectedEpisode, setSelectedEpisode] = useState('1');

    const episodes = {
        1: ['Episode 1', 'Episode 2', 'Episode 3', 'Episode 4'],
        2: ['Episode 1', 'Episode 2', 'Episode 3'],
    };

    return (
        <main className="player-page">
            <div className="container py-4">
                <div className="player-layout">
                    <div className="video-section">
                        <div className="video-player-wrapper">
                            <iframe
                                className="video-player"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Series Player"
                                allowFullScreen></iframe>
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
                        <img
                            className="banner-image"
                            src="https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
                            alt="Series Banner"
                        />

                        <div className="banner-content">
                            <div className="imdb-badge">
                                <i className="bi bi-star-fill"></i> 9.5 IMDb
                            </div>

                            <h2 className="banner-title">
                                Breaking Bad
                            </h2>

                            <div className="series-meta">
                                <span>2008</span>
                                <span>5 Seasons</span>
                                <span>HD</span>
                            </div>

                            <p className="banner-description">
                                Walter White, a struggling chemistry teacher, teams up with former student Jesse Pinkman to build a drug empire.
                            </p>

                            <button className="watch-btn">
                                <i className="bi bi-play-fill"></i>
                                Watch Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SeriesPlayer;