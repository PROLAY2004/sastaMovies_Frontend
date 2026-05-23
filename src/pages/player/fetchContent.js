import Api from '../../api/Api.js';
import apiInterceptor from '../../api/interceptor.js';

const api = new Api();

export default async function displayPlayer(navigate, toast, contentId) {
	try {
		const response = await apiInterceptor(
			navigate,
			toast,
			'POST',
			'/user/fetch-player',
			{ contentId },
		);

		const result = await response.json();

		if (result.success) {
			return result.data;
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
