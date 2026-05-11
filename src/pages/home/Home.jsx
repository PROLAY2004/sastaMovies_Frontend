import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import '../../styles/home.scss';
import isAuthenticated from '../../utils/checkAuth.js';
import Nav from '../../components/Navbar.jsx';
import HomeLoader from '../../components/Loader/HomeLoader.jsx';
import HeroSection from '../../components/HeroSection.jsx';
import displayHome from './fetchHome.js';

function Home() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [randomContent, setRandomContent] = useState({});

	const displayContact = () => {
		navigate('/contact');
	};

	const handleDisplay = async () => {
		const isSuccess = await displayHome(navigate, toast);

		if (isSuccess) {
			setLoading(false);
			setRandomContent(isSuccess.randomContent);
			// console.log(isSuccess);
		}
	}

	useEffect(() => {
		handleDisplay();
	}, [])

	const saveContent = () => {
		if (!isAuthenticated()) {
			toast.error('Please Login to save Content', {
				position: 'top-right',
				autoClose: 5000,
				theme: 'dark',
			});
		}
	}

	return (
		<>
			<Nav />
			<HomeLoader loading={loading} />

			<main style={{ display: loading ? 'none' : 'block' }}>
				<HeroSection randomContent={randomContent} />

				<div className="container py-3">
					<div className="section-header">
						<h2 className="section-title">🎬 Movies</h2>
						<Link to="/movies" className="section-link">
							View all <i className="bi bi-arrow-right-short"></i>
						</Link>
					</div>
					<div className="row g-4">
						<div className="col-6 col-sm-6 col-md-4 col-lg-3">
							<div className="movie-card">
								<img src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tumbbad-et00079092-1726221741.jpg" className="card-img-top" alt="${item.title}" loading="lazy" />
								<div className="card-body">
									<h5 className="card-title text-truncate">Name</h5>
									<div className="card-info-row">
										<div className="rating-hd-group d-flex gap-3 w-100 justify-content-between">
											<div>
												<span className="hd-icon me-2">HD</span>
												<span className="card-year">2020</span>
											</div>
											8.9
										</div>
									</div>
									<div className="card-buttons">
										<button className="btn-watch-sm watch-now-btn" ><i className="bi bi-play-fill"></i> Watch</button>
										<button className="btn-later-sm watch-later-btn" onClick={() => saveContent()} ><i className="bi bi-bookmark"></i> <span className="d-none d-sm-block align-items-center">Later</span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
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
			</main>

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
