import { useNavigate } from 'react-router-dom';
import '../../styles/common/modal.scss';

function LoginRequiredModal({ show, onClose }) {
    const navigate = useNavigate();
    if (!show) return null;

    if(show){
        console.log('Showing Login Modal');
    }

    return (
        <div className="modal-overlay">

            <div className="login-modal-container">

                {/* CLOSE BUTTON */}
                <button
                    className="modal-close-btn"
                    onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>

                {/* CONTENT */}
                <div className="modal-content">

                    <h2 className="modal-title">
                        Login Required
                    </h2>

                    <p className="modal-description">
                        Please login to watch this content and continue streaming your favorite movies and series.
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="modal-actions">

                        <button
                            className="login-btn" onClick={() => {navigate('/login'); onClose();}}>
                            <i className="bi bi-box-arrow-in-right"></i>
                            Login Now
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={onClose}>
                            Maybe Later
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LoginRequiredModal;