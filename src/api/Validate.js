const axios = require('axios');

export const Validate = async (payload) => {
	console.log(payload)
	const config = {
		method: 'POST',
		url: 'http://150.100.253.61:8181/cxf/id-checker/validate',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			payload
		},
	};
	const response = axios(config)
		.then(({ data: outActualizar }) => {
			console.log(outActualizar);
			return JSON.stringify(outActualizar);
		})
		.catch((error) => {
			return error;
		});

	return response;
}