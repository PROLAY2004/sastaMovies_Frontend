import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import '../../styles/home.scss';
import isAuthenticated from '../../utils/checkAuth.js';
import Nav from '../../components/Navbar.jsx';
import HomeLoader from '../../components/Loader/HomeLoader.jsx';
import HeroSection from '../../components/HeroSection.jsx';
import MovieCards from '../../components/MovieCards.jsx';
import SeriesCards from '../../components/SeriesCards.jsx';
import displayHome from './fetchHome.js';
import LoginRequiredModal from '../../components/modals/LoginRequiredModal.jsx';

function Home() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [displaySubscribe, setDisplaySubscribe] = useState(true);
	const [randomContent, setRandomContent] = useState({});
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const [pageReload, setPageReload] = useState(0);
	const [moviesEmptyState, setMoviesEmptyState] = useState(true);
	const [seriesEmptyState, setSeriesEmptyState] = useState(true);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const handleDisplay = async () => {
		const isSuccess = await displayHome(navigate, toast);

		if (isSuccess) {
			setLoading(false);
			setRandomContent(isSuccess.randomContent);
			setMovies(isSuccess.movies);
			setSeries(isSuccess.series);

			if (isSuccess.movies.length) {
				setMoviesEmptyState(false);
			}

			if (isSuccess.series.length) {
				setSeriesEmptyState(false);
			}
		}
	}

	useEffect(() => {
		handleDisplay();

		if(isAuthenticated()){
			setDisplaySubscribe(false);
		}
	}, [pageReload])

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
				<HeroSection randomContent={randomContent} pageReload={pageReload} refresh={setPageReload} LoginRequiredModal={(showModal) => setShowLoginModal(showModal)} />

				<div className="container py-3">
					<div className="section-header">
						<h2 className="section-title">Movies</h2>
						<Link to="/movies" className="section-link">
							View all <i className="bi bi-arrow-right-short"></i>
						</Link>
					</div>
					<div className="row g-4">
						{movies.map((movie) => (
							<MovieCards key={movie._id} movie={movie} pageReload={pageReload} refresh={setPageReload} LoginRequiredModal={(showModal) => setShowLoginModal(showModal)} />
						))}

						<div className="movie-card text-center py-3" style={{ display: moviesEmptyState ? 'block' : 'none' }}>
							<div className="mb-4">
								<i
									className="bi bi-film"
									style={{
										fontSize: '4rem',
										color: 'rgba(245,184,27,0.7)',
									}}></i>
							</div>

							<h3 className="fw-bold mb-3">
								No Movies Available
							</h3>

							<p className="text-secondary mb-4">
								Movies are not available right now. Please check again later.
							</p>
						</div>
					</div>
				</div>


				<div className="container py-3">
					<div className="section-header">
						<h2 className="section-title">Series</h2>
						<Link to="/series" className="section-link">
							View all <i className="bi bi-arrow-right-short"></i>
						</Link>
					</div>
					<div className="row g-4">
						{series.map((series) => (
							<SeriesCards key={series._id} series={series} pageReload={pageReload} refresh={setPageReload} LoginRequiredModal={(showModal) => setShowLoginModal(showModal)} />
						))}

						<div className="movie-card text-center py-3" style={{ display: seriesEmptyState ? 'block' : 'none' }}>
							<div className="mb-4">
								<i
									className="bi bi-film"
									style={{
										fontSize: '4rem',
										color: 'rgba(245,184,27,0.7)',
									}}></i>
							</div>

							<h3 className="fw-bold mb-3">
								No Series Available
							</h3>

							<p className="text-secondary mb-4">
								Series are not available right now. Please check again later.
							</p>
						</div>
					</div>
				</div>

				<div className="container my-5" style={{ display: displaySubscribe ? 'block' : 'none'}}>
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
									onClick={() => navigate('/contact')}
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

			<LoginRequiredModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
		</>
	);
}

export default Home;
