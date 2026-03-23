import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isAuthenticated from '../utils/checkAuth.js';

function Nav() {
	const [btnName, setBtnName] = useState('Sign In');
	const navigate = useNavigate();
	const pathName = window.location.pathname;
	const displayProfile = () => {
		navigate('/account');
	};

	useEffect(() => {
		if (isAuthenticated()) {
			setBtnName('Account');
		}
	});

	return (
		<nav className="navbar fixed-top navbar-expand-lg">
			<div className="container">
				<a className="navbar-brand d-flex gap-2 align-items-center" href="#">
					<i className="bi bi-film"></i>
					<h1 className="text-warning fw-bold fs-4 m-0">
						Sasta<span style={{ color: 'white' }}>Movies</span>
					</h1>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarMain"
					style={{ borderColor: '#F5B81B' }}>
					<span
						className="navbar-toggler-icon"
						style={{ filter: 'invert(1)' }}></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarMain">
					<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={`nav-link ${pathName === '/home' ? 'active' : ''}`}
								to="/home">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${pathName === '/movies' ? 'active' : ''}`}
								to="/movies">
								Movies
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${pathName === '/series' ? 'active' : ''}`}
								to="/series">
								Series
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${pathName === '/contact' ? 'active' : ''}`}
								to="/contact">
								Contact
							</Link>
						</li>
					</ul>
					<div className="d-flex">
						<button
							className="btn-login"
							id="loginBtnTrigger"
							onClick={displayProfile}>
							<i className="bi bi-person-circle me-1"></i> {btnName}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
