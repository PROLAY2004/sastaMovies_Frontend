import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import '../../styles/player.scss';
import configaruration from '../../config/config.js';
import displayPlayer from './fetchContent.js';
import PlayerLoader from '../../components/PlayerLoader.jsx';
import ImdbCard from '../../components/ImdbCard.jsx';

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
    const clickTimeoutRef = useRef(null);
    const seekTimeoutRef = useRef(null);

    // Gestures & Interaction Refs
    const holdTimeoutRef = useRef(null);
    const isHoldingRef = useRef(false);
    const ignoreNextClickRef = useRef(false);
    const initialPinchDistRef = useRef(null);
    const touchStartRef = useRef(null); // Track 1-finger swipe for Volume/Brightness
    const gestureTimeoutRef = useRef(null);

    // ==========================================
    // 2. STATE
    // ==========================================
    const [loading, setLoading] = useState(true);
    const [contentData, setContentData] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [seasonIndex, setSeasonIndex] = useState(0);
    const [episodeIndex, setEpisodeIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoBuffering, setIsVideoBuffering] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [brightness, setBrightness] = useState(1); // Faux brightness (0.1 to 1)
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(false);
    const [seekAnimation, setSeekAnimation] = useState(null);

    const [isIdle, setIsIdle] = useState(false);
    const [showVolumeUI, setShowVolumeUI] = useState(false);
    const [isDraggingProgress, setIsDraggingProgress] = useState(false);
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);

    // Advanced UI States
    const [showSpeedBadge, setShowSpeedBadge] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [gestureInfo, setGestureInfo] = useState(null); // { type: 'volume' | 'brightness', value: 0-1 }

    // ==========================================
    // 3. DATA FETCHING
    // ==========================================
    useEffect(() => {
        window.scrollTo(0, 0);
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
    const getClientX = (e) => e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;

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
        volumeTimeoutRef.current = setTimeout(() => setShowVolumeUI(false), 2000);
    };

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return hours > 0 ? `${hours}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
    };

    const showGestureIndicator = (type, value) => {
        setGestureInfo({ type, value });
        if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
        gestureTimeoutRef.current = setTimeout(() => setGestureInfo(null), 1500);
    };

    const startHoldTimer = () => {
        if (playbackRate === 2) return;
        if (videoRef.current && !videoRef.current.paused) {
            holdTimeoutRef.current = setTimeout(() => {
                isHoldingRef.current = true;
                videoRef.current.playbackRate = 2;
                setShowSpeedBadge(true);
            }, 400);
        }
    };

    const endHoldTimer = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        if (isHoldingRef.current) {
            isHoldingRef.current = false;
            if (videoRef.current) {
                videoRef.current.playbackRate = 1;
                setPlaybackRate(1);
            }
            setShowSpeedBadge(false);
            return true;
        }
        return false;
    };

    // ==========================================
    // 5. PLAYER CONTROLS
    // ==========================================
    const togglePlay = () => {
        if (videoRef.current.paused) {
            setIsVideoBuffering(true);
            setIsPlaying(true);
            videoRef.current.play().catch((err) => {
                setIsVideoBuffering(false);
                setIsPlaying(false);
                console.warn("Playback prevented:", err);
            });
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoClick = (e) => {
        if (ignoreNextClickRef.current) return;

        // Prevent click events if we just finished a swipe gesture
        if (touchStartRef.current && touchStartRef.current.swiped) return;

        const rect = e.target.getBoundingClientRect();
        const clientX = e.clientX;

        if (clickTimeoutRef.current) {
            // DOUBLE CLICK / TAP: Skip
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            const isRightSide = clientX > rect.left + (rect.width / 2);

            if (isRightSide) skip(10);
            else skip(-10);
        } else {
            // SINGLE CLICK / TAP
            clickTimeoutRef.current = setTimeout(() => {
                const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

                if (isTouchDevice) {
                    // Mobile: Toggle Controls
                    setIsIdle((prevIdle) => {
                        const newIdleState = !prevIdle; // Toggle the state

                        // Clear any existing timers
                        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

                        // If we are SHOWING controls (!newIdleState), start the 5s auto-hide timer
                        if (!newIdleState) {
                            idleTimeoutRef.current = setTimeout(() => {
                                if (videoRef.current && !videoRef.current.paused) {
                                    setIsIdle(true);
                                }
                            }, 5000);
                        }

                        return newIdleState;
                    });
                } else {
                    // PC: Play / Pause
                    togglePlay();
                }

                clickTimeoutRef.current = null;
            }, 250);
        }
    };

    const skip = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime += time;
            const direction = time > 0 ? 'forward' : 'backward';
            setSeekAnimation(direction);

            if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
            seekTimeoutRef.current = setTimeout(() => setSeekAnimation(null), 600);
        }
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
            playerContainerRef.current.requestFullscreen().then(() => {
                if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
                    window.screen.orientation.lock('landscape').catch(() => { });
                }
            }).catch(err => toast.error(`Fullscreen Error: ${err.message}`));
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
    // 6. SCRUBBING
    // ==========================================
    const handleTimeUpdate = () => {
        if (!isDraggingProgress && videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => setDuration(videoRef.current.duration);

    const handleProgressScrub = (e) => {
        if (progressRef.current && duration > 0) {
            const rect = progressRef.current.getBoundingClientRect();
            const clientX = getClientX(e);
            const scrubPosition = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const newTime = scrubPosition * duration;
            setCurrentTime(newTime);
            videoRef.current.currentTime = newTime;
        }
    };

    const handleVolumeScrub = (e) => {
        if (volumeRef.current) {
            const rect = volumeRef.current.getBoundingClientRect();
            const clientX = getClientX(e);
            const scrubPosition = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            videoRef.current.volume = scrubPosition;
            setVolume(scrubPosition);
            if (scrubPosition > 0) setIsMuted(false);
        }
    };

    // ==========================================
    // 7. GLOBAL EVENT LISTENERS
    // ==========================================
    useEffect(() => {
        const handleMove = (e) => {
            if (isDraggingProgress) handleProgressScrub(e);
            if (isDraggingVolume) handleVolumeScrub(e);
        };
        const handleEnd = () => {
            setIsDraggingProgress(false);
            setIsDraggingVolume(false);
        };

        if (isDraggingProgress || isDraggingVolume) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', handleEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDraggingProgress, isDraggingVolume, duration]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
            resetIdleTimer();

            if (e.code === 'Space') {
                if (e.repeat) return;
                startHoldTimer();
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'k': togglePlay(); break;
                case 'arrowleft': skip(-10); break;
                case 'arrowright': skip(10); break;
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
                case 'f': toggleFullscreen(); break;
                case 'c': toggleCaptions(); break;
                case 'm': toggleMute(); break;
                default: break;
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!endHoldTimer()) togglePlay();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [isMuted, volume, isFullscreen, playbackRate]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);
            if (!isFs) {
                if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
                    window.screen.orientation.unlock();
                }
                setIsZoomed(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // ==========================================
    // 8. RENDER VARIABLES
    // ==========================================
    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
    const volumePercentage = isMuted ? 0 : volume * 100;
    const hasCaptions = Boolean(contentData?.subtitles?.[seasonIndex]?.[episodeIndex]);

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

                        <div
                            className={`custom-player-wrapper ${isIdle ? 'is-idle' : ''} ${!isPlaying ? 'is-paused' : ''}`}
                            onPointerMove={(e) => {
                                // ONLY trigger for actual mouse movement, ignore touch-synthesized moves
                                if (e.pointerType === 'mouse') resetIdleTimer();
                            }}
                            onMouseEnter={resetIdleTimer}
                            onMouseLeave={handlePlayerMouseLeave}
                            ref={playerContainerRef}
                            style={{ touchAction: 'none' }} // Crucial to prevent page scrolling while swiping
                        >
                            <video
                                ref={videoRef}
                                key={`${contentId}-${seasonIndex}-${episodeIndex}`}
                                className="video-element"
                                crossOrigin="anonymous"
                                poster={contentData?.posterUrl?.horizontal || '{}'}
                                onClick={handleVideoClick}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={() => setIsPlaying(false)}
                                onContextMenu={(e) => e.preventDefault()}
                                onLoadStart={() => setIsVideoBuffering(true)}
                                onWaiting={() => setIsVideoBuffering(true)}
                                onPlaying={() => setIsVideoBuffering(false)}
                                onCanPlay={() => {
                                    if (videoRef.current && videoRef.current.paused) setIsVideoBuffering(false);
                                }}

                                // --- MOBILE TOUCH & SWIPE EVENTS ---
                                onTouchStart={(e) => {
                                    if (e.touches.length === 2 && isFullscreen && isPlaying) {
                                        // Pinch Zoom Start
                                        const dist = Math.hypot(
                                            e.touches[0].clientX - e.touches[1].clientX,
                                            e.touches[0].clientY - e.touches[1].clientY
                                        );
                                        initialPinchDistRef.current = dist;
                                    } else if (e.touches.length === 1 && isFullscreen && isPlaying) {
                                        // Volume & Brightness Swipe Start
                                        const touch = e.touches[0];
                                        touchStartRef.current = {
                                            y: touch.clientY,
                                            type: touch.clientX < window.innerWidth / 2 ? 'brightness' : 'volume',
                                            startVol: volume,
                                            startBright: brightness,
                                            swiped: false // Used to prevent click-to-pause if we swiped
                                        };
                                    }
                                }}
                                
                                onTouchMove={(e) => {
                                    if (e.touches.length === 2 && initialPinchDistRef.current && isFullscreen && isPlaying) {
                                        // Pinch Zoom Move
                                        const dist = Math.hypot(
                                            e.touches[0].clientX - e.touches[1].clientX,
                                            e.touches[0].clientY - e.touches[1].clientY
                                        );

                                        // If fingers are moving for a pinch, cancel the 2x hold timer!
                                        if (Math.abs(dist - initialPinchDistRef.current) > 20) {
                                            endHoldTimer();
                                        }

                                        // 40px threshold makes it feel intentional and less jittery
                                        if (dist > initialPinchDistRef.current + 40) {
                                            setIsZoomed(true); // Zoom In
                                        } else if (dist < initialPinchDistRef.current - 40) {
                                            setIsZoomed(false); // Zoom Out
                                        }
                                    } else if (e.touches.length === 1 && touchStartRef.current && isFullscreen && isPlaying) {
                                        // Volume & Brightness Swipe Move
                                        const touch = e.touches[0];
                                        const deltaY = touchStartRef.current.y - touch.clientY; // UP is positive

                                        // Require a 20px drag before activating (prevents accidental triggers on taps)
                                        if (Math.abs(deltaY) > 20) {
                                            touchStartRef.current.swiped = true;

                                            // --- THE FIX: Instantly cancel 2x speed if the finger is swiping! ---
                                            endHoldTimer();
                                            // -------------------------------------------------------------------

                                            // 1.5 multiplier makes the swipe feel responsive
                                            const change = (deltaY / window.innerHeight) * 1.5;

                                            if (touchStartRef.current.type === 'volume') {
                                                let newVol = Math.max(0, Math.min(1, touchStartRef.current.startVol + change));
                                                if (videoRef.current) {
                                                    videoRef.current.volume = newVol;
                                                    setVolume(newVol);
                                                    setIsMuted(newVol === 0);
                                                    showGestureIndicator('volume', newVol);
                                                }
                                            } else {
                                                let newBright = Math.max(0.1, Math.min(1, touchStartRef.current.startBright + change));
                                                setBrightness(newBright);
                                                showGestureIndicator('brightness', newBright);
                                            }
                                        }
                                    }
                                }}

                                onTouchEnd={(e) => {
                                    initialPinchDistRef.current = null;
                                    // Reset swipe state after a short delay so onClick doesn't accidentally trigger
                                    if (touchStartRef.current) {
                                        setTimeout(() => { touchStartRef.current = null; }, 100);
                                    }
                                }}

                                // Pointer events for the Hold-to-2x speed
                                onPointerDown={(e) => {
                                    if (!e.isPrimary || !isPlaying) return;
                                    startHoldTimer();
                                }}
                                onPointerUp={() => {
                                    if (endHoldTimer()) {
                                        ignoreNextClickRef.current = true;
                                        setTimeout(() => ignoreNextClickRef.current = false, 150);
                                    }
                                }}
                                onPointerLeave={() => endHoldTimer()}
                                onPointerCancel={() => endHoldTimer()}

                                // Apply Dynamic Zoom & Brightness
                                style={{
                                    objectFit: (isFullscreen && isZoomed) ? 'cover' : 'contain',
                                    filter: `brightness(${brightness})`
                                }}
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

                            {/* 2X Speed Badge */}
                            {showSpeedBadge && (
                                <div className="speed-badge">
                                    <span>2x Speed</span>
                                    <i className="bi bi-chevron-double-right"></i>
                                </div>
                            )}

                            {/* VLC Style Volume/Brightness Indicators */}
                            {gestureInfo && (
                                <div className="gesture-indicator">
                                    <i className={`bi ${gestureInfo.type === 'volume' ? (gestureInfo.value === 0 ? 'bi-volume-mute-fill' : 'bi-volume-up-fill') : 'bi-brightness-high-fill'}`}></i>
                                    <div className="gesture-bar-bg">
                                        <div className="gesture-bar-fill" style={{ width: `${gestureInfo.value * 100}%` }}></div>
                                    </div>
                                    <span>{Math.round(gestureInfo.value * 100)}%</span>
                                </div>
                            )}

                            {isVideoBuffering && (
                                <div className="video-spinner-overlay">
                                    <div className="video-spinner"></div>
                                </div>
                            )}

                            {/* Seek Animations */}
                            <div className={`seek-ripple-overlay left ${seekAnimation === 'backward' ? 'animate' : ''}`}>
                                <div className="ripple-circle"></div>
                                <div className="seek-content">
                                    <div className="arrows">
                                        <i className="bi bi-caret-left-fill"></i>
                                        <i className="bi bi-caret-left-fill"></i>
                                        <i className="bi bi-caret-left-fill"></i>
                                    </div>
                                    <span>10 seconds</span>
                                </div>
                            </div>

                            <div className={`seek-ripple-overlay right ${seekAnimation === 'forward' ? 'animate' : ''}`}>
                                <div className="ripple-circle"></div>
                                <div className="seek-content">
                                    <div className="arrows">
                                        <i className="bi bi-caret-right-fill"></i>
                                        <i className="bi bi-caret-right-fill"></i>
                                        <i className="bi bi-caret-right-fill"></i>
                                    </div>
                                    <span>10 seconds</span>
                                </div>
                            </div>

                            <div className={`center-play-overlay ${(isPlaying || isVideoBuffering) ? 'is-playing' : ''}`} onClick={togglePlay}>
                                <button className="center-play-btn">
                                    <i className="bi bi-play-fill"></i>
                                </button>
                            </div>

                            <div className="custom-controls">
                                <div className="progress-container" ref={progressRef} onMouseDown={(e) => { setIsDraggingProgress(true); handleProgressScrub(e); }} onTouchStart={(e) => { setIsDraggingProgress(true); handleProgressScrub(e); }}>
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
                                                <div className="volume-slider" ref={volumeRef} onMouseDown={(e) => { setIsDraggingVolume(true); handleVolumeScrub(e); }} onTouchStart={(e) => { setIsDraggingVolume(true); handleVolumeScrub(e); }}>
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
                                        <button className="control-text-btn" onClick={changePlaybackRate}>{playbackRate}x</button>
                                        <button
                                            className="control-btn"
                                            title={hasCaptions ? "Subtitles" : "No Subtitles Available"}
                                            onClick={toggleCaptions}
                                            disabled={!hasCaptions}
                                            style={{
                                                color: (captionsEnabled && hasCaptions) ? '#f5b81b' : '',
                                                opacity: hasCaptions ? 1 : 0.35,
                                                cursor: hasCaptions ? 'pointer' : 'not-allowed'
                                            }}
                                        >
                                            <i className={`bi ${(captionsEnabled && hasCaptions) ? 'bi-badge-cc-fill' : 'bi-badge-cc'}`}></i>
                                        </button>
                                        <button className="control-btn" onClick={toggleFullscreen}>
                                            <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Series Details Unchanged... */}
                        <div className="series-content-box mt-4">
                            <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
                                <div>
                                    <h1 className="series-title mb-2">{contentData?.title || 'Content Title'}</h1>
                                    <p className="series-subtitle mb-0">{contentData?.genre?.join(' • ') || 'Genre'}</p>
                                </div>

                                <div className="season-dropdown" style={{ display: contentData?.contentType === 'series' ? 'block' : 'none' }}>
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

                            <p className="series-description">{contentData?.description || 'Lorem ipsum dolor sit amet...'}</p>

                            <div className="episode-wrapper mt-4" style={{ display: contentData?.contentType === 'series' ? 'block' : 'none' }}>
                                <h4 className="episode-heading mb-3">Episodes</h4>
                                <div className="episode-list">
                                    {episodes.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setEpisodeIndex(index);
                                                setIsPlaying(false);
                                                setCurrentTime(0);
                                                setIsVideoBuffering(true);
                                            }}
                                            className={`episode-btn ${episodeIndex === index ? 'active' : ''}`}>
                                            EP {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <ImdbCard contentData={contentData} />
                </div>
            </div>
        </main>
    );
}

export default ContentPlayer;