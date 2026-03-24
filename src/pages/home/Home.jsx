import { Link, useNavigate } from 'react-router-dom';

import '../../styles/home.scss';
import Nav from '../../components/Navbar.jsx';

function Home() {
	const navigate = useNavigate();
	const displayContact = () => {
		navigate('/contact');
	};

	return (
		<>
			<Nav />

			<div className="hero-wrapper" id="heroSection">
				<div className="hero-background">
					<img
						id="heroBgImage"
						src="https://picsum.photos/id/26/1920/800"
						alt="hero background"
					/>
				</div>
				<div className="hero-gradient"></div>
				<div className="hero-content">
					<div className="hero-text">
						<div className="featured-badge">
							<i
								className="bi bi-star-fill me-1"
								style={{ fontSize: '0.65rem' }}></i>{' '}
							FEATURED MOVIE
						</div>
						<h1 className="hero-title" id="heroTitle">
							Neon Ghost
						</h1>
						<p className="hero-desc" id="heroDesc">
							In a neon-drenched metropolis, a rogue hacker uncovers a
							conspiracy that threatens reality itself.
						</p>
						<div className="hero-meta" id="heroMeta">
							<span>2025</span> • Cyberpunk • 2h 18min
						</div>
						<div className="hero-buttons">
							<button className="btn-hero" id="heroWatchNow">
								<i className="bi bi-play-fill"></i> Watch Now
							</button>
							<button className="btn-hero-outline" id="heroWatchLater">
								<i className="bi bi-clock"></i> Watch Later
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="container py-3">
				<div className="section-header">
					<h2 className="section-title">🎬 Movies</h2>
					<Link to="/movies" className="section-link">
						View all <i className="bi bi-arrow-right-short"></i>
					</Link>
				</div>
				<div className="row g-4" id="moviesGrid"></div>
			</div>

			<div className="container py-3">
				<div className="section-header">
					<h2 className="section-title">📺 Series</h2>
					<Link to="/series" className="section-link">
						View all <i className="bi bi-arrow-right-short"></i>
					</Link>
				</div>
				<div className="row g-4" id="seriesGrid"></div>
			</div>

			<div className="container my-5">
				<div
					className="p-4 rounded-4"
					style={{
						background:
							'radial-gradient(circle at 10% 20%, rgba(30,30,30,0.9), #020202)',
						border: '1px solid rgba(245,184,27,0.35)',
						backdropFilter: ' blur(4px)',
					}}>
					<div className="row align-items-center">
						<div className="col-md-8">
							<h3 className="fw-bold" style={{ letterSpacing: '-0.3px' }}>
								Watch on any device <i className="bi bi-tv"></i>
							</h3>
							<p className="mb-0 text-secondary">
								Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more.
							</p>
						</div>
						<div className="col-md-4 text-md-end mt-3 mt-md-0">
							<button
								onClick={displayContact}
								className="btn-login"
								id="ctaBtn"
								style={{ background: '#F5B81B' }}>
								Start free trial <i className="bi bi-arrow-right"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<footer className="footer-area">
				<div className="container px-4">
					<div className="row gy-4">
						<div className="col">
							<h4 className="text-warning fw-bold">
								Sasta<span style={{ color: 'white' }}>Movies</span>
							</h4>
							<p className="text-secondary small">
								A movie website lets users watch free movies and series with
								online streaming without download, providing instant access to
								HD content, fast playback, and a smooth, user-friendly
								experience across all devices anytime, anywhere.
							</p>
						</div>
					</div>
					<hr
						className="mt-4"
						style={{ borderColor: 'rgba(245,184,27,0.2)' }}
					/>
					<p className="text-center text-secondary small mt-3">
						© 2026 SastaMovies — All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}

export default Home;
