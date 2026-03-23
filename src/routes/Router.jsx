import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import Default from '../components/Default.jsx';
import Home from '../pages/home/Home.jsx';
import Movies from '../pages/movie/Movies.jsx';
import Series from '../pages/series/Series.jsx';
import Contact from '../pages/contact/Contact.jsx';
import Login from '../pages/login/Login.jsx';

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
		element: <Login />,
	},

	{
		path: '/account',
		element: (
			<ProtectedRoute>
				<h1>Profile</h1>
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <h1>No page found</h1>,
	},
]);

export default router;
