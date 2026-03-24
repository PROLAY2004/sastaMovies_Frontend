import '../../styles/account.scss';

function Dashboard() {
	return (
		<>
			<main className="profile-content">
				<div className="profile-header-bar">
					<div className="greeting-block">
						<h1>
							Welcome back, <span id="userFirstName">Alex</span>
						</h1>
						<p>Your premium hub — watchlist & profile</p>
					</div>
					<div className="logout-btn" id="signOutBtn">
						<i className="bi bi-box-arrow-right"></i> <span>Logout</span>
					</div>
				</div>

				<div className="profile-card-modern">
					<div className="profile-row">
						<div className="profile-identity">
							<div className="avatar-circle">
								<i className="bi bi-person-fill"></i>
							</div>
							<div className="name-email">
								<h2 id="profileFullName">Alex Thompson</h2>
								<p>
									<i
										className="bi bi-envelope-fill"
										style={{ fontSize: '0.7rem' }}></i>{' '}
									<span id="profileEmailDisplay">
										alex.thompson@sastamovies.com
									</span>
								</p>
							</div>
						</div>
						<button className="edit-profile-action" id="editProfileBtnModern">
							<i className="bi bi-pencil-square"></i> Edit profile
						</button>
					</div>

					<div className="stats-grid">
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-calendar3"></i> MEMBER SINCE
							</div>
							<div className="stat-value" id="memberSinceDisplay">
								March 15, 2024
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-gem"></i> SUBSCRIPTION
							</div>
							<div className="stat-value">
								<span className="sub-badge" id="subscriptionStatusBadge">
									Active
								</span>
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-hourglass-bottom"></i> ACCESS UNTIL
							</div>
							<div className="stat-value" id="accessUntilDisplay">
								December 31, 2025
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-bookmark-heart"></i> WATCH LATER
							</div>
							<div className="stat-value" id="savedCountDisplay">
								6 items
							</div>
						</div>
					</div>
				</div>

				<div className="watchlist-header">
					<h3>
						<i className="bi bi-bookmark-fill"></i> Watch later
					</h3>
					<button className="clear-all-btn" id="clearAllWatchlistBtn">
						<i className="bi bi-trash3"></i> Clear all
					</button>
				</div>

				<div id="savedMoviesContainer">
					<div className="empty-watchlist">
						<i className="bi bi-bookmark-heart"></i>
						<p>Your watchlist feels empty</p>
						<p>Add movies & series you love to watch later</p>
						<button className="browse-button" id="emptyBrowseBtn">
							Browse collections
						</button>
					</div>
				</div>
			</main>

			<footer className="profile-footer">
				<div className="container text-center">
					<p>© 2026 SastaMovies — All Rights Reserved. Stream the future.</p>
				</div>
			</footer>
		</>
	);
}

export default Dashboard;
