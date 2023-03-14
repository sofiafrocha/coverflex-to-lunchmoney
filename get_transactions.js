import axios from 'axios';
import { readFile } from 'fs/promises';

const config = { headers: { Authorization: '' } };

export async function readToken() {
	const token = JSON.parse(
		await readFile(
			new URL('token.json', import.meta.url),
		),
	);
	config.headers.Authorization = `Bearer ${token.token}`;
}

export async function getTransactions() {
	await readToken();
	return axios.get('https://menhir-api.coverflex.com/api/employee/movements?pagination=no', config).catch((input) => {
		console.log('🍏 Error: ', input.response.status, input.response.data.error);
	});
}
