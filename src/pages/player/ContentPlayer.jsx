import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import '../../styles/player.scss';
import configaruration from '../../config/config.js';
import displayPlayer from './fetchContent.js';
import PlayerLoader from '../../components/PlayerLoader.jsx';

function ContentPlayer() {
    const navigate = useNavigate();
    const { contentId } = useParams();

    // ==========================================
    // 1. REFS
    // ==========================================
    const videoRef = useRef(null);
    const playerContainerRef = useRef(null);
    const progressRef = useRef(null);
    const volumeRef = useRef(null);
    const idleTimeoutRef = useRef(null);
    const volumeTimeoutRef = useRef(null);

    // ==========================================
    // 2. STATE
    // ==========================================
    // Data State
    const [loading, setLoading] = useState(true);
    const [contentData, setContentData] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [seasonIndex, setSeasonIndex] = useState(0);
    const [episodeIndex, setEpisodeIndex] = useState(0);

    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); // Range: 0 to 1
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(false);

    // UI & Interaction State
    const [isIdle, setIsIdle] = useState(false);
    const [showVolumeUI, setShowVolumeUI] = useState(false);
    const [isDraggingProgress, setIsDraggingProgress] = useState(false);
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);

    // ==========================================
    // 3. DATA FETCHING
    // ==========================================
    useEffect(() => {
        const fetchContent = async () => {
            const isSuccess = await displayPlayer(navigate, toast, contentId);
            if (isSuccess) {
                setLoading(false);
                setContentData(isSuccess.contentInfo);
            }
        };
        fetchContent();
    }, [contentId, navigate]);

    useEffect(() => {
        if (contentData?.contentType === 'series') {
            setEpisodes(contentData.contentIds[seasonIndex] || []);
        }
    }, [contentData, seasonIndex]);

    // ==========================================
    // 4. TIMERS & HELPERS
    // ==========================================
    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

        idleTimeoutRef.current = setTimeout(() => {
            if (videoRef.current && !videoRef.current.paused) {
                setIsIdle(true);
            }
        }, 5000);
    };

    const handlePlayerMouseLeave = () => {
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        setIsIdle(false);
    };

    const triggerVolumeUI = () => {
        setShowVolumeUI(true);
        if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);

        volumeTimeoutRef.current = setTimeout(() => {
            setShowVolumeUI(false);
        }, 2000);
    };

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return hours > 0
            ? `${hours}:${formattedMinutes}:${formattedSeconds}`
            : `${formattedMinutes}:${formattedSeconds}`;
    };

    // ==========================================
    // 5. PLAYER CONTROLS
    // ==========================================
    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const skip = (time) => {
        if (videoRef.current) videoRef.current.currentTime += time;
    };

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        videoRef.current.muted = newMutedState;
        videoRef.current.volume = newMutedState ? 0 : (volume > 0 ? volume : 1);
    };

    const changePlaybackRate = () => {
        const newRate = playbackRate >= 2 ? 1 : playbackRate + 0.25;
        videoRef.current.playbackRate = newRate;
        setPlaybackRate(newRate);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                toast.error(`Fullscreen Error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const toggleCaptions = () => {
        const tracks = videoRef.current.textTracks;
        if (tracks && tracks.length > 0) {
            const newMode = tracks[0].mode === 'showing' ? 'hidden' : 'showing';
            tracks[0].mode = newMode;
            setCaptionsEnabled(newMode === 'showing');
        } else {
            toast.info("No subtitles available for this episode.");
        }
    };

    // ==========================================
    // 6. MEDIA EVENTS & SCRUBBING
    // ==========================================
    const handleTimeUpdate = () => {
        if (!isDraggingProgress && videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const handleProgressScrub = (e) => {
        if (progressRef.current && duration > 0) {
            const rect = progressRef.current.getBoundingClientRect();
            const scrubPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newTime = scrubPosition * duration;
            setCurrentTime(newTime);
            videoRef.current.currentTime = newTime;
        }
    };

    const handleVolumeScrub = (e) => {
        if (volumeRef.current) {
            const rect = volumeRef.current.getBoundingClientRect();
            const scrubPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            videoRef.current.volume = scrubPosition;
            setVolume(scrubPosition);
            if (scrubPosition > 0) setIsMuted(false);
        }
    };

    const handleProgressMouseDown = (e) => {
        setIsDraggingProgress(true);
        handleProgressScrub(e);
    };

    const handleVolumeMouseDown = (e) => {
        setIsDraggingVolume(true);
        handleVolumeScrub(e);
    };

    // ==========================================
    // 7. GLOBAL EVENT LISTENERS
    // ==========================================
    // Dragging Listeners
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDraggingProgress) handleProgressScrub(e);
            if (isDraggingVolume) handleVolumeScrub(e);
        };
        const handleMouseUp = () => {
            setIsDraggingProgress(false);
            setIsDraggingVolume(false);
        };

        if (isDraggingProgress || isDraggingVolume) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingProgress, isDraggingVolume, duration]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
            resetIdleTimer();

            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    togglePlay(); break;
                case 'arrowleft':
                    skip(-10); break;
                case 'arrowright':
                    skip(10); break;
                case 'arrowup':
                    if (videoRef.current) {
                        const newVol = Math.min(1, videoRef.current.volume + 0.1);
                        videoRef.current.volume = newVol;
                        setVolume(newVol);
                        if (newVol > 0) setIsMuted(false);
                        triggerVolumeUI();
                    }
                    break;
                case 'arrowdown':
                    if (videoRef.current) {
                        const newVol = Math.max(0, videoRef.current.volume - 0.1);
                        videoRef.current.volume = newVol;
                        setVolume(newVol);
                        if (newVol === 0) setIsMuted(true);
                        triggerVolumeUI();
                    }
                    break;
                case 'f':
                    toggleFullscreen(); break;
                case 'c':
                    toggleCaptions(); break;
                case 'm':
                    toggleMute(); break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMuted, volume, isFullscreen]);

    // Fullscreen Listener
    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // ==========================================
    // 8. RENDER VARIABLES
    // ==========================================
    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
    const volumePercentage = isMuted ? 0 : volume * 100;

    return (
        <main className="player-page">
            <nav className="player-navbar">
                <div className="player-nav-container">
                    <h2 className="logo-text">Sasta<span>Movies</span></h2>
                </div>
            </nav>

            <PlayerLoader loading={loading} />

            <div className="player-container py-4" style={{ display: loading ? 'none' : 'block' }}>
                <div className="player-layout">
                    <div className="video-section">

                        {/* --- CUSTOM VIDEO PLAYER --- */}
                        <div
                            className={`custom-player-wrapper ${isIdle ? 'is-idle' : ''} ${!isPlaying ? 'is-paused' : ''}`}
                            onMouseMove={resetIdleTimer}
                            onMouseEnter={resetIdleTimer}
                            onMouseLeave={handlePlayerMouseLeave}
                            ref={playerContainerRef}
                        >
                            <video
                                ref={videoRef}
                                key={`${contentId}-${seasonIndex}-${episodeIndex}`}
                                className="video-element"
                                crossOrigin="anonymous"
                                poster={contentData?.posterUrl?.horizontal || '{}'}
                                onClick={togglePlay}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={() => setIsPlaying(false)}
                            >
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
                                    />
                                )}
                                Your browser does not support the video tag.
                            </video>

                            {/* Center Play Button */}
                            <div className={`center-play-overlay ${isPlaying ? 'is-playing' : ''}`} onClick={togglePlay}>
                                <button className="center-play-btn">
                                    <i className="bi bi-play-fill"></i>
                                </button>
                            </div>

                            {/* Bottom Control Bar */}
                            <div className="custom-controls">
                                {/* Progress Timeline */}
                                <div className="progress-container" ref={progressRef} onMouseDown={handleProgressMouseDown}>
                                    <div className="progress-bar" style={{ width: '100%', height: '100%', position: 'relative' }}>
                                        <div className="progress-filled" style={{ width: `${progressPercentage}%` }}></div>
                                        <div className="progress-thumb" style={{ left: `${progressPercentage}%` }}></div>
                                    </div>
                                </div>

                                <div className="controls-main">
                                    <div className="controls-left">
                                        <button className="control-btn play-btn-primary" onClick={togglePlay}>
                                            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                                        </button>

                                        <button className="control-btn" onClick={() => skip(-10)} title="Rewind 10s">
                                            <i className="bi bi-skip-backward-fill"></i>
                                        </button>
                                        <button className="control-btn" onClick={() => skip(10)} title="Forward 10s">
                                            <i className="bi bi-skip-forward-fill"></i>
                                        </button>

                                        <div className={`volume-container ${showVolumeUI ? 'force-show' : ''}`}>
                                            <button className="control-btn" onClick={() => { toggleMute(); triggerVolumeUI(); }}>
                                                <i className={`bi ${isMuted || volume === 0 ? 'bi-volume-mute-fill' : volume < 0.5 ? 'bi-volume-down-fill' : 'bi-volume-up-fill'}`}></i>
                                            </button>
                                            <div className="volume-slider-container">
                                                <div className="volume-slider" ref={volumeRef} onMouseDown={handleVolumeMouseDown}>
                                                    <div className="volume-filled" style={{ width: `${volumePercentage}%` }}></div>
                                                    <div className="volume-thumb" style={{ left: `${volumePercentage}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <span className="time-display">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="controls-right">
                                        <button className="control-text-btn" onClick={changePlaybackRate}>
                                            {playbackRate}x
                                        </button>
                                        <button
                                            className="control-btn"
                                            title="Subtitles"
                                            onClick={toggleCaptions}
                                            style={{ color: captionsEnabled ? '#f5b81b' : '' }}
                                        >
                                            <i className={`bi ${captionsEnabled ? 'bi-badge-cc-fill' : 'bi-badge-cc'}`}></i>
                                        </button>
                                        <button className="control-btn" onClick={toggleFullscreen}>
                                            <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- CONTENT DETAILS --- */}
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
                                    <label className="dropdown-label">Season</label>
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
                                {contentData?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                            </p>

                            <div className="episode-wrapper mt-4" style={{ display: contentData?.contentType === 'series' ? 'block' : 'none' }}>
                                <h4 className="episode-heading mb-3">Episodes</h4>
                                <div className="episode-list">
                                    {episodes.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setEpisodeIndex(index);
                                                setIsPlaying(false);
                                            }}
                                            className={`episode-btn ${episodeIndex === index ? 'active' : ''}`}>
                                            EP {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR BANNER --- */}
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
                                    <span>{contentData?.release?.slice(-4) || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="movie-details-grid">
                                <div className="detail-label">Genre:</div>
                                <div className="detail-value">{contentData?.genre?.join(', ') || 'N/A'}</div>

                                <div className="detail-label">Director:</div>
                                <div className="detail-value">{contentData?.directors?.join(', ') || 'N/A'}</div>

                                <div className="detail-label">Cast:</div>
                                <div className="detail-value">{contentData?.cast?.join(', ') || 'N/A'}</div>

                                <div className="detail-label">Release Date:</div>
                                <div className="detail-value">{contentData?.release || 'N/A'}</div>

                                <div className="detail-label">Country:</div>
                                <div className="detail-value">{contentData?.country || 'N/A'}</div>

                                <div className="detail-label">Language:</div>
                                <div className="detail-value">{contentData?.language || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContentPlayer;