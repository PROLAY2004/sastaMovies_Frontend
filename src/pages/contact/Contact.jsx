import '../../styles/contact.scss';
import Nav from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

function Home() {
	return (
		<>
			<Nav />

			<div className="main-content">
				<div className="container">
					<div className="contact-header">
						<h1>Get in Touch</h1>
						<p>
							Have questions, feedback, or just want to say hello? We'd love to
							hear from you.
						</p>
					</div>

					<div className="row g-4 form-section">
						<div className="col-lg-7">
							<div className="form-wrapper">
								<h3 className="form-title">Send us a Message</h3>
								<p className="form-subtitle">
									Fill out the form below and we'll get back to you within 24
									hours.
								</p>

								<form id="contactForm">
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label className="form-label">Full Name</label>
												<input
													type="text"
													className="form-control"
													id="fullName"
													placeholder="John Doe"
													required
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="form-label">Email Address</label>
												<input
													type="email"
													className="form-control"
													id="emailAddress"
													placeholder="john@example.com"
													required
												/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="form-label">Message</label>
										<textarea
											className="form-control"
											id="messageText"
											rows="5"
											placeholder="Tell us how we can help you..."
											required></textarea>
									</div>

									<div className="form-group">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="newsletterCheck"
												style={{
													backgroundColor: 'transparent',
													borderColor: 'var(--color-primary)',
												}}
											/>
											<label
												className="form-check-label"
												style={{
													color: 'var(--color-gray-light)',
													fontSize: '0.8rem',
												}}>
												Subscribe to newsletter for updates and exclusive offers
											</label>
										</div>
									</div>

									<button type="submit" className="btn-submit">
										<i className="bi bi-send-fill me-2"></i>Send Message
									</button>
								</form>
							</div>
						</div>

						<div className="col-lg-5">
							<div className="container trial-section">
								<div className="trial-card">
									<div className="row align-items-center">
										<div className="col">
											<h3 className="trial-title">
												<i
													className="bi bi-gem me-2"
													style={{ color: '#F5B81B' }}></i>{' '}
												Start your free trial
											</h3>
											<p className="trial-text mb-0">
												Watch unlimited movies & series. Cancel anytime. For
												more details Contact us.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="contact-card">
									<div className="contact-icon">
										<i className="bi bi-envelope-fill"></i>
									</div>
									<h3>Email Us</h3>
									<p>Our support team is available 24/7</p>
									<a
										href="mailto:sastamovies1@gmail.com"
										className="contact-link">
										sastamovies1@gmail.com
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="faq-section p-3" id="faqSection">
						<div className="faq-header">
							<h2>Frequently Asked Questions</h2>
							<p>Everything you need to know about Nebula Streaming</p>
						</div>

						<div className="row justify-content-center">
							<div className="col-lg-10">
								<div className="accordion" id="faqAccordion">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq1">
												How do I start my free trial?
											</button>
										</h2>
										<div
											id="faq1"
											className="accordion-collapse collapse show"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												Getting started is simple! Fill out the Contact Us form
												with valid details. Our team will review your request,
												verify the information, and activate your free trial.
												Once approved, you will be notified via email.
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq2">
												What payment methods do you accept?
											</button>
										</h2>
										<div
											id="faq2"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												This platform is not publicly accessible. Access and
												benefits are granted only to selected users after
												verification and mutual agreement.
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq3">
												Can I cancel my subscription anytime?
											</button>
										</h2>
										<div
											id="faq3"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												Yes, absolutely! You can cancel your subscription at any
												time through your account settings. There are no
												cancellation fees, and you'll continue to have access
												until the end of your current billing period.
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq4">
												What devices can I watch on?
											</button>
										</h2>
										<div
											id="faq4"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												SastaMovies is available on all your favorite devices
												including Smart TVs, streaming devices (Roku, Apple TV,
												Fire TV), game consoles (PlayStation, Xbox), mobile
												devices (iOS, Android), and web browsers. You can watch
												on up to 4 devices simultaneously with our premium plan.
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq5">
												Do you offer 4K streaming?
											</button>
										</h2>
										<div
											id="faq5"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												Yes! All our premium content is available in stunning 4K
												Ultra HD with HDR support. You'll need a compatible
												device and a stable internet connection of at least 25
												Mbps for the best experience.
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq6">
												How can I request a movie or series?
											</button>
										</h2>
										<div
											id="faq6"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion">
											<div className="accordion-body">
												We love hearing from our community! You can submit
												content requests through our contact form by selecting
												"Content Request" as the subject. Our team reviews all
												requests regularly and adds new content based on
												popularity and availability.
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}

export default Home;
