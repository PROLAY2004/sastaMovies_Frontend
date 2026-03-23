import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from './routes/Router.jsx';

createRoot(document.getElementById('root')).render(
	<>
		<ToastContainer
			position="top-right"
			autoClose={5000}
			newestOnTop={true}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
		/>
		<RouterProvider router={router} />
	</>,
);
