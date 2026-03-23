import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

import '../../styles/login.scss';
import sendOtp from './sendOtp.js';
import userLogin from './userLogin.js';
import isAuthenticated from '../../utils/checkAuth.js';
import googleResponse from './googleAuth.js';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [otp, setOtp] = useState('');
	const [timer, setTimer] = useState(120);
	const [emailForm, setEmailForm] = useState('block');
	const [otpForm, setOtpForm] = useState('none');

	const sendMail = async (e) => {
		e.preventDefault();
		const isSuccess = await sendOtp(email, setLoading, toast);

		if (isSuccess) {
			setEmailForm('none');
			setOtpForm('block');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isLogged = await userLogin(email, otp, setLoading, toast);

		if (isLogged) {
			navigate('/account', { replace: true });
		}
	};

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/account', { replace: true });
		}

		if (timer === 0) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer]);

	const loginWithGoogle = useGoogleLogin({
		onSuccess: googleResponse,
		onError: googleResponse,
		flow: 'auth-code',
	});

	return (
		<>
			<div className="overlay"></div>
			<div className="container-fluid container-main">
				<div className="row w-100 align-items-center">
					<div className="col-lg-5 d-flex justify-content-center">
						<form
							className="login-box"
							onSubmit={sendMail}
							method="post"
							style={{ display: emailForm }}>
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

							<button
								disabled={loading}
								className="btn btn-main w-100 mb-3 d-flex justify-content-center gap-2 text-dark align-items-center"
								type="submit">
								{loading ? (
									<>
										<div
											className="spinner-border"
											role="status"
											style={{ width: '20px', height: '20px' }}></div>{' '}
										Sending OTP...
									</>
								) : (
									'Continue with Email'
								)}
							</button>

							<div className="divider">
								<span>OR</span>
							</div>

							<button
								type="button"
								onClick={loginWithGoogle}
								className="btn btn-google w-100 d-flex align-items-center justify-content-center gap-2">
								<i className="bi bi-google"></i> Continue with Google
							</button>

							<div className="footer-text">
								Access is limited to approved users only
							</div>
						</form>

						<form
							className="login-box"
							style={{ display: otpForm }}
							onSubmit={handleSubmit}>
							<div className="logo">
								Sasta<span>Movies</span>
							</div>

							<div className="subtitle">
								Enter the OTP sent to your email 🎬
							</div>

							<div className="mb-3 input-group-custom justify-content-center">
								<i className="bi bi-lock-fill"></i>

								<input
									type="text"
									maxLength="6"
									className="form-control"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									placeholder="Enter 6 Digits OTP"
								/>
							</div>

							<div
								className="text-center mb-3"
								style={{ fontSize: '13px', color: '#9ca3af' }}>
								{timer > 0 ? (
									<>
										Resend OTP in{' '}
										<span style={{ color: '#facc15' }}>{timer}s</span>
									</>
								) : (
									<span style={{ color: '#22c55e' }}>
										You can resend OTP now
									</span>
								)}
							</div>

							<button
								disabled={loading}
								className="btn btn-main w-100 mb-3 d-flex justify-content-center gap-2 text-dark align-items-center"
								type="submit">
								{loading ? (
									<>
										<div
											className="spinner-border"
											role="status"
											style={{ width: '20px', height: '20px' }}></div>
										Verifying...
									</>
								) : (
									'Verify OTP'
								)}
							</button>

							<button
								type="button"
								onClick={() => {
									setTimer(120);
									sendOtp(email, setProcessing, toast);
								}}
								disabled={timer !== 0}
								className="btn btn-google w-100 d-flex align-items-center justify-content-center gap-2"
								style={{
									opacity: timer !== 0 ? 0.5 : 1,
									cursor: timer !== 0 ? 'not-allowed' : 'pointer',
								}}>
								{processing ? (
									<>
										<div
											className="spinner-border"
											role="status"
											style={{ width: '20px', height: '20px' }}></div>{' '}
										Please Wait...
									</>
								) : (
									'🔄 Resend OTP'
								)}
							</button>

							<div className="footer-text">
								Didn’t receive the code? Check spam or try again
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
