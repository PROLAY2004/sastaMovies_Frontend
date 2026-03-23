import '../../styles/login.scss';
import { useState } from 'react';

function Login() {
	const [email, setEmail] = useState('');

	const sendMail = async (e) => {
		e.preventDefault();
		console.log(email);
	};

	return (
		<>
			<div className="overlay"></div>
			<div className="container-fluid container-main">
				<div className="row w-100 align-items-center">
					<div className="col-lg-5 d-flex justify-content-center">
						<form className="login-box" onSubmit={sendMail} method="post">
							<div className="logo">
								Sasta<span>Movies</span>
							</div>

							<div className="subtitle">
								Unlimited entertainment. One login away 🎬
							</div>

							<div className="mb-3 input-group-custom">
								<i className="bi bi-envelope"></i>
								<input
									type="email"
									className="form-control"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
								/>
							</div>

							<button className="btn btn-main w-100 mb-3" type="submit">
								Continue with Email
							</button>

							<div className="divider">
								<span>OR</span>
							</div>

							<button className="btn btn-google w-100 d-flex align-items-center justify-content-center gap-2">
								<i className="bi bi-google"></i> Continue with Google
							</button>

							<div className="footer-text">
								Access is limited to approved users only
							</div>
						</form>
					</div>

					<div className="col-lg-7 d-none d-lg-block">
						<div className="hero-box">
							<img
								src="https://sanskarsavvy.com/wp-content/uploads/2024/08/goat-life-aavesham-maharaja-tillu-netflix-amazon-disney-hotstar-premalu.png"
								alt="hero"
							/>

							<div className="hero-overlay">
								<h2>Stream. Chill. Repeat.</h2>
								<p>Experience movies like never before with SastaMovies</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
