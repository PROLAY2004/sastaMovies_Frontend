import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

import '../../styles/common/modal.scss';
import removeAll from '../../pages/dashboard/removeAll.js';

function RemoveModal({ open, onClose, pageReload }) {
    if (!open) return null;

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleRemove = async () => {
        setLoading(true);
        const isSuccess = await removeAll(navigate, toast);
        setLoading(false);

        if(isSuccess){
            onClose();
            pageReload((prev) => prev+1);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="custom-modal">

                <div className="modal-header">
                    <h3>Clear Watchlist</h3>

                    <button onClick={() => { if (!loading) { onClose(); } }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="modal-body">
                    <p>
                        Are you sure you want to remove all saved movies and series from your watch later list?
                    </p>

                    <div className="modal-actions">
                        <button className="cancel-btn" onClick={() => { if (!loading) { onClose(); } }}>
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="danger-btn mb-3 d-flex justify-content-center gap-2 align-items-center"
                            type="submit"
                            onClick={handleRemove}>
                            {loading ? (
                                <>
                                    <div
                                        className="spinner-border"
                                        role="status"
                                        style={{ width: '20px', height: '20px' }}></div>{' '}
                                    Removing...
                                </>
                            ) : (
                                'Remove All'
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RemoveModal;