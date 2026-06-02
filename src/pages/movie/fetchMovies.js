import Api from '../../api/Api.js';
import configaration from '../../config/config.js';

const api = new Api();

// Added 'payload' parameter to send filters to the backend
export default async function displayMovies(toast, payload = {}) {
	try {
		const response = await api.postApi(
			`${configaration.BASE_URL}/user/movies`,
            '',
			payload, // Passing the search/filter parameters here
		);

		const result = await response.json();

		if (result.success) {
			return result.data; // Now returns { movies, options }
		} else {
			toast.error(result.message, {
				position: 'top-right',
				autoClose: 5000,
				theme: 'dark',
			});

			return false;
		}
	} catch (err) {
		toast.error(err.message, {
			position: 'top-right',
			autoClose: 5000,
			theme: 'dark',
		});

		return false;
	}
}
