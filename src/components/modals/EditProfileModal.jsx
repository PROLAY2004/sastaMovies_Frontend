import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import editProfile from '../../pages/dashboard/editProfile.js'

function EditModal({ open, onClose, userName, pageReload }) {
    const navigate = useNavigate();
    const [name, setName] = useState(userName || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const isSuccess = await editProfile(navigate, toast, name.trim());
        
        setLoading(false);

        if (isSuccess) {
            onClose();
            pageReload((prev) => {
                return prev + 1;
            });
        }
    }

    useEffect(() => {
        if (open) {
            setName(userName || '');
        }
    }, [userName, open]);

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="custom-modal">

                <div className="modal-header">
                    <h3>Edit Profile</h3>

                    <button onClick={() => { if (!loading) { onClose(); } }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>

                    <p>
                        Update your profile name.
                    </p>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        name='newName'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="modal-actions">
                        <button className="cancel-btn" type='button' onClick={() => { if (!loading) { onClose(); } }}>
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="save-btn mb-3 d-flex justify-content-center gap-2 align-items-center"
                            type="submit"
                            >
                            {loading ? (
                                <>
                                    <div
                                        className="spinner-border"
                                        role="status"
                                        style={{ width: '20px', height: '20px' }}></div>{' '}
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditModal;