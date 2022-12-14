const axios = require('axios');

export const LoginService = async (data) => {
	console.log(data);
	// const data = JSON.stringify({
	// 	//"user":"user@email.com",
	// 	//"password":"password"
	// 	user,
	// 	passwd
	// });
	const config = {
		method: 'post',
		url: 'http://150.100.253.61:8181/cxf/usuarios/services/login',
		headers: {
			'Content-Type': 'application/json',
			user: data.email,
			passwd: data.password
		},
	};
	const response = axios(config)
		.then(({ data: outLogin }) => {
			console.log(outLogin);
			return JSON.stringify(outLogin);
		})
		.catch((error) => {
			return error;
		});

	return response;
}
