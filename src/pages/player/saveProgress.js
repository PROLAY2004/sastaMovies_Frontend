import apiInterceptor from '../../api/interceptor.js';

export default async function saveProgress(navigate, toast, data) {
	try {
		const response = await apiInterceptor(
			navigate,
			toast,
			'POST',
			'/user/save-progress',
			data,
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
