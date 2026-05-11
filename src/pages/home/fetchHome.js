import Api from '../../api/Api.js';
import configaration from '../../config/config.js';

const api = new Api();

export default async function displayHome(navigate, toast) {
	try {
		const response = await api.getApi(
			`${configaration.BASE_URL}/user/home`,
			'',
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
