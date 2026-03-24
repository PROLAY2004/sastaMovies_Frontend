import '../../styles/movie.scss';
import Nav from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

function Home() {
	return (
		<>
			<Nav />

			<div className="main-content">
				<div className="container">
					<div className="movies-header">
						<h1>Movies Library</h1>
						<p>Discover thousands of movies from around the world</p>
					</div>

					<div className="filter-section">
						<div className="search-wrapper">
							<i className="bi bi-search search-icon"></i>
							<input
								type="text"
								className="search-input"
								id="searchInput"
								placeholder="Search by title, genre, or actor..."
							/>
						</div>

						<div className="filter-group">
							<div className="filter-item">
								<label className="filter-label">Genre</label>
								<select className="filter-select" id="genreFilter">
									<option value="all">All Genres</option>
									<option value="Action">Action</option>
									<option value="Sci-Fi">Sci-Fi</option>
									<option value="Drama">Drama</option>
									<option value="Thriller">Thriller</option>
									<option value="Cyberpunk">Cyberpunk</option>
									<option value="Fantasy">Fantasy</option>
									<option value="Crime">Crime</option>
									<option value="Adventure">Adventure</option>
								</select>
							</div>

							<div className="filter-item">
								<label className="filter-label">Year</label>
								<select className="filter-select" id="yearFilter">
									<option value="all">All Years</option>
									<option value="2025">2025</option>
									<option value="2024">2024</option>
									<option value="2023">2023</option>
									<option value="2022">2022</option>
								</select>
							</div>

							<div className="filter-item">
								<label className="filter-label">Rating</label>
								<select className="filter-select" id="ratingFilter">
									<option value="all">All Ratings</option>
									<option value="9">9+ Stars</option>
									<option value="8">8+ Stars</option>
									<option value="7">7+ Stars</option>
									<option value="6">6+ Stars</option>
								</select>
							</div>

							<div className="filter-item">
								<label className="filter-label">Quality</label>
								<select className="filter-select" id="qualityFilter">
									<option value="all">All Quality</option>
									<option value="4K">4K Ultra HD</option>
									<option value="HD">HD</option>
								</select>
							</div>

							<div className="filter-buttons">
								<button className="btn-filter" id="applyFiltersBtn">
									Apply Filters
								</button>
								<button className="btn-reset" id="resetFiltersBtn">
									Reset
								</button>
							</div>
						</div>

						<div className="active-filters" id="activeFilters"></div>
					</div>

					<div className="results-count">
						<div className="count-text">
							<span className="count-number" id="movieCount">
								0
							</span>{' '}
							movies found
						</div>
						<div>
							<select className="sort-select" id="sortSelect">
								<option value="default">Sort by: Featured</option>
								<option value="rating">Sort by: Rating (High to Low)</option>
								<option value="year">Sort by: Year (Newest First)</option>
								<option value="title">Sort by: Title (A-Z)</option>
							</select>
						</div>
					</div>

					<div className="row g-4" id="moviesGrid"></div>

					<div id="noResultsTemplate">
						<div className="no-results">
							<i className="bi bi-film"></i>
							<h3>No movies found</h3>
							<p>Try adjusting your filters or search terms</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}

export default Home;
