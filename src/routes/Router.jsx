import { createBrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import configaruration from '../config/config.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import Default from '../components/Default.jsx';
import Home from '../pages/home/Home.jsx';
import Movies from '../pages/movie/Movies.jsx';
import Series from '../pages/series/Series.jsx';
import Contact from '../pages/contact/Contact.jsx';
import Login from '../pages/login/Login.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Default />,
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/movies',
		element: <Movies />,
	},
	{
		path: '/series',
		element: <Series />,
	},
	{
		path: '/contact',
		element: <Contact />,
	},
	{
		path: '/login',
		element: (
			<GoogleOAuthProvider clientId={configaruration.CLIENT_ID}>
				<Login />
			</GoogleOAuthProvider>
		),
	},

	{
		path: '/account',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <h1>No page found</h1>,
	},
]);

export default router;
