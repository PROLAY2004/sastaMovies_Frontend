// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isAuthenticated from '../utils/checkAuth.js';

function Nav() {
	const [btnName, setBtnName] = useState('Sign In');
	const navigate = useNavigate();
	const pathName = window.location.pathname;
	const displayProfile = () => {
		localStorage.removeItem('postLoginRedirect');
		navigate('/account');
	};

	useEffect(() => {
		if (isAuthenticated()) {
			setBtnName('Account');
		}
	});

	return (
		<nav className="navbar fixed-top navbar-expand-lg py-3">
			<div className="container px-4 px-lg-0">
				<Link className="navbar-brand d-flex gap-2 align-items-center" to="/home">
					<i className="bi bi-film"></i>
					<span className="fw-bold fs-4 m-0 text-white" style={{ letterSpacing: '-0.5px' }}>
						Sasta<span style={{ color: '#f5b81b', fontWeight: 700 }}>Movies</span>
					</span>
				</Link>
				<button
					className="navbar-toggler border-0 shadow-none"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarMain"
					aria-label="Toggle navigation">
					<i className="bi bi-list" style={{ fontSize: '1.8rem', color: '#f5b81b' }}></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarMain">
					<ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
						<li className="nav-item">
							<Link
								className={`nav-link px-3 py-2 ${pathName === '/home' ? 'active' : ''}`}
								to="/home">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link px-3 py-2 ${pathName === '/movies' ? 'active' : ''}`}
								to="/movies">
								Movies
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link px-3 py-2 ${pathName === '/series' ? 'active' : ''}`}
								to="/series">
								Series
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link px-3 py-2 ${pathName === '/contact' ? 'active' : ''}`}
								to="/contact">
								Contact
							</Link>
						</li>
					</ul>
					<div className="d-flex">
						<button
							className="btn-login rounded-pill px-4 py-2 fw-semibold border-0"
							id="loginBtnTrigger"
							onClick={displayProfile}>
							<i className="bi bi-person-circle me-2"></i> {btnName}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Nav;