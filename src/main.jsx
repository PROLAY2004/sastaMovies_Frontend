import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from './routes/Router.jsx';

createRoot(document.getElementById('root')).render(
	<>
		<RouterProvider router={router} />
	</>,
);
