import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../../styles/movie.scss';
import Nav from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import displaySeries from './fetchSeries.js';
import SeriesCards from '../../components/SeriesCards.jsx';
import LoginRequiredModal from '../../components/modals/LoginRequiredModal.jsx';
import MovieLoader from '../../components/Loader/MovieLoader.jsx';
import isAuthenticated from '../../utils/checkAuth.js';
import getUser from '../../utils/fetchUserDetails.js';

function Series() {
	// Series List States
	const navigate = useNavigate();
	const [series, setSeries] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [pageReload, setPageReload] = useState(0);
	const [savedContents, setSavedContents] = useState([]);

	// 1. Add a ref to track the previous value of pageReload
	const prevPageReload = useRef(pageReload);

	// Dynamic Dropdown Options (fetched from DB)
	const [filterOptions, setFilterOptions] = useState({ genres: [], years: [], ratings: [] });

	// Pending UI Selections (wait for "Apply" button)
	const [selectedGenre, setSelectedGenre] = useState('all');
	const [selectedYear, setSelectedYear] = useState('all');
	const [selectedRating, setSelectedRating] = useState('all');

	// Live Inputs (Search & Sort apply immediately)
	const [searchInput, setSearchInput] = useState('');

	// Active Filters sent to API
	const [activeFilters, setActiveFilters] = useState({
		searchQuery: '',
		genre: 'all',
		year: 'all',
		rating: 'all',
		sortBy: 'default'
	});

	// 2. Add a 'showLoader' parameter, defaulting to true
	const handleDisplay = async (showLoader = true) => {
		// Only trigger the full loading screen if we explicitly want to
		if (showLoader) {
			setLoading(true);
		}

		const isSuccess = await displaySeries(toast, activeFilters);

		if (isSuccess) {
			setSeries(isSuccess.series);

			// Populate dynamic dropdowns only on initial fetch
			if (filterOptions.genres.length === 0) {
				setFilterOptions(isSuccess.options);
			}

			if (isSuccess.series.length) {
				setIsEmpty(false);
			} else {
				setIsEmpty(true);
			}
		}

		setLoading(false);
	};

	const fetchUser = async () => {
		if (isAuthenticated()) {
			const userDetails = await getUser(navigate, toast);

			if (userDetails?.user?.savedContents) {
				setSavedContents(userDetails.user.savedContents);
			}
		}
	}

	// Apply button triggers the filter updates
	const applyFilters = () => {
		setActiveFilters(prev => ({
			...prev,
			genre: selectedGenre,
			year: selectedYear,
			rating: selectedRating
		}));
	};

	// Reset button clears everything
	const resetFilters = () => {
		setSelectedGenre('all');
		setSelectedYear('all');
		setSelectedRating('all');
		setSearchInput('');

		setActiveFilters({
			searchQuery: '',
			genre: 'all',
			year: 'all',
			rating: 'all',
			sortBy: 'default'
		});
	};

	// Debounce the search input
	useEffect(() => {
		const delaySearch = setTimeout(() => {
			setActiveFilters(prev => ({ ...prev, searchQuery: searchInput }));
		}, 500);

		return () => clearTimeout(delaySearch);
	}, [searchInput]);

	// 3. Fetch data whenever activeFilters change or page is reloaded via bookmark
	useEffect(() => {
		// If pageReload changed, it means a bookmark was clicked. We want a silent refresh.
		const isBookmarkRefresh = prevPageReload.current !== pageReload;

		// If it IS a bookmark refresh, pass 'false' to hide the loader. 
		// If it's a filter change or initial mount, pass 'true' to show the loader.
		handleDisplay(!isBookmarkRefresh);
		fetchUser();

		// Update the ref to the current value
		prevPageReload.current = pageReload;
	}, [activeFilters, pageReload]);

	return (
		<>
			<Nav />

			<div className="main-content">
				<div className="container">
					<div className="movies-header">
						<h1>TV Series</h1>
						<p>Binge-worthy series from around the world. New episodes added weekly.</p>
					</div>

					<div className="filter-section">
						<div className="search-wrapper">
							<i className="bi bi-search search-icon"></i>
							<input
								type="text"
								className="search-input"
								placeholder="Search by title, genre, or cast..."
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>

						<div className="filter-group">
							<div className="filter-item">
								<label className="filter-label">Genre</label>
								<select
									className="filter-select"
									value={selectedGenre}
									onChange={(e) => setSelectedGenre(e.target.value)}
								>
									<option value="all">All Genres</option>
									{filterOptions.genres.map(genre => (
										<option key={genre} value={genre}>{genre}</option>
									))}
								</select>
							</div>

							<div className="filter-item">
								<label className="filter-label">Year</label>
								<select
									className="filter-select"
									value={selectedYear}
									onChange={(e) => setSelectedYear(e.target.value)}
								>
									<option value="all">All Years</option>
									{filterOptions.years.map(year => (
										<option key={year} value={year}>{year}</option>
									))}
								</select>
							</div>

							<div className="filter-item">
								<label className="filter-label">Rating</label>
								<select
									className="filter-select"
									value={selectedRating}
									onChange={(e) => setSelectedRating(e.target.value)}
								>
									<option value="all">All Ratings</option>
									{filterOptions.ratings.map(rating => (
										<option key={rating} value={rating}>{rating}+ Stars</option>
									))}
								</select>
							</div>

							<div className="filter-buttons">
								<button className="btn-filter" onClick={applyFilters}>
									Apply Filters
								</button>
								<button className="btn-reset" onClick={resetFilters}>
									Reset
								</button>
							</div>
						</div>

						<div className="active-filters"></div>
					</div>

					<div className="results-count">
						<div className="count-text">
							<span className="count-number">
								{series.length}
							</span>{' '}
							series found
						</div>
						<div>
							<select
								className="sort-select"
								value={activeFilters.sortBy}
								onChange={(e) => setActiveFilters(prev => ({ ...prev, sortBy: e.target.value }))}
							>
								<option value="default">Sort by: Featured</option>
								<option value="rating">Sort by: Rating (High to Low)</option>
								<option value="year">Sort by: Year (Newest First)</option>
								<option value="title">Sort by: Title (A-Z)</option>
								<option value="seasons">Sort by: Most Seasons</option>
							</select>
						</div>
					</div>

					<div className="row g-4">
						<MovieLoader loading={loading} />

						{!loading && series.map((item) => (
							<SeriesCards
								key={item._id}
								series={item}
								pageReload={pageReload}
								refresh={setPageReload}
								LoginRequiredModal={(showModal) => setShowLoginModal(showModal)}
								savedContents={savedContents}
							/>
						))}
					</div>

					<div className='mt-4' style={{ display: isEmpty && !loading ? 'block' : 'none' }}>
						<div className="no-results">
							<i className="bi bi-tv"></i>
							<h3>No series found</h3>
							<p>Try adjusting your filters or search terms</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>

			<LoginRequiredModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
		</>
	);
}

export default Series;