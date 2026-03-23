const googleResponse = async (authResult) => {
	try {
		console.log(authResult);
	} catch (err) {
		console.log(err.message);
	}
};

export default googleResponse;
