import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProfileCards from '../../components/ProfileCards.jsx';
import ProfileLoader from '../../components/Loader/profileLoader.jsx';
import displayProfile from './fetchDashboard.js'
import logout from '../../utils/logout.js';

import '../../styles/account.scss';

function Dashboard() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [memberSince, setMemberSince] = useState('');
	const [status, setStatus] = useState('')
	const [validTill, setValidTill] = useState('');
	const [savedCount, setSavedCount] = useState(0);
	const [emptyState, setEmptyState] = useState(false);

	const setSubscription = (data) => {
		if (data.isSuperAdmin) {
			setStatus('SuperAdmin')
		}

		if (data.role == 'admin') {
			setStatus('Admin');
		}

		if (data.isBlocked) {
			setStatus('Blocked');
		}

		if (new Date(data.validTill > new Date())) {
			setStatus('Active');
		}
		else {
			setStatus('Expired');
		}
	}

	const handleDisplay = async () => {
		setLoading(true);

		const isSuccess = await displayProfile(navigate, toast);

		if (isSuccess) {
			setName(isSuccess.userInfo.name);
			setEmail(isSuccess.userInfo.email);
			setMemberSince(isSuccess.userSince);
			setSubscription(isSuccess.userInfo);
			setValidTill(isSuccess.validTill);
			setSavedCount(isSuccess.contentCount);

			console.log(isSuccess)

			if (!isSuccess.contentCount) {
				setEmptyState(true);
			}
		}

		setLoading(false);
	}

	useEffect(() => {
		handleDisplay();
	}, [])

	return (
		<>
			<ProfileLoader loading={loading} />

			<main className="profile-content" style={{ display: loading ? 'none' : 'block' }}>
				<div className="profile-header-bar">
					<div className="greeting-block">
						<h1>
							Welcome back, <span id="userFirstName">{name}</span>
						</h1>
						<p>Your premium hub — watchlist & profile</p>
					</div>
					<button className="logout-btn" onClick={() => logout(toast)}>
						<i className="bi bi-box-arrow-right"></i> <span>Logout</span>
					</button>
				</div>

				<div className="profile-card-modern">
					<div className="profile-row">
						<div className="profile-identity">
							<div className="avatar-circle">
								<i className="bi bi-person-fill"></i>
							</div>
							<div className="name-email">
								<h2 id="profileFullName">{name}</h2>
								<p>
									<i
										className="bi bi-envelope-fill"
										style={{ fontSize: '0.7rem' }}></i>{' '}
									<span id="profileEmailDisplay">
										{email}
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
								{memberSince}
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-gem"></i> SUBSCRIPTION
							</div>
							<div className="stat-value">
								<span className={status + " sub-badge"}>
									{status}
								</span>
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-hourglass-bottom"></i> ACCESS UNTIL
							</div>
							<div className="stat-value" id="accessUntilDisplay">
								{validTill}
							</div>
						</div>
						<div className="stat-chip">
							<div className="stat-label">
								<i className="bi bi-bookmark-heart"></i> WATCH LATER
							</div>
							<div className="stat-value" id="savedCountDisplay">
								{savedCount} items
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

				<div className="movies-grid">
					<ProfileCards display={emptyState} />
				</div>

				<div className="empty-watchlist" style={{ display: emptyState ? 'block' : 'none' }}>
					<i className="bi bi-bookmark-heart"></i>
					<p>Your watchlist feels empty</p>
					<p>Add movies & series you love to watch later</p>
					<Link to='/home' className="browse-button">
						Browse collections
					</Link>
				</div>

			</main>

			<footer className="profile-footer" style={{ display: loading ? 'none' : 'block' }}>
				<div className="container text-center">
					<p>© 2026 SastaMovies — All Rights Reserved. Stream the future.</p>
				</div>
			</footer>
		</>
	);
}

export default Dashboard;
