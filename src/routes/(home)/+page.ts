import { PUBLIC_BACKEND_URL, PUBLIC_BASIC_TOKEN } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { rosaryDataStore } from '$lib/stores/rosaries';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) =>
{
	// const res = {
	// 	FRONTEND_CONFIG: {
	// 		code: 'FRONTEND_CONFIG',
	// 		name: 'FRONTEND_CONFIG',
	// 		type: 'STRING',
	// 		value: { appName: 'Rosary' },
	// 		subConfigs: {}
	// 	},
	// 	client: 'telegram',
	// 	telegramUserInfo: {
	// 		id: 1425191234,
	// 		first_name: 'broccoli',
	// 		last_name: '',
	// 		username: 'pwhbdev',
	// 		language_code: 'en',
	// 		allows_write_to_pm: true
	// 	},
	// 	token:
	// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzI3MjliY2E4MmI2NDExMTUyNTQ0NjciLCJpYXQiOjE3MzA2MjA2MDYsImV4cCI6MTczMDcwNzAwNn0.RQ1_zq9d3HGjU4vcaOwv_xF6ysrPjMaxaPB80aTT3lk',
	// 	deviceId: '7a120158-8e3c-4827-a0e8-b833d2a58c2b',
	// 	initData: {
	// 		query_id: 'AAFCsfJUAAAAAEKx8lSrhNv5',
	// 		user: '{"id":1425191234,"first_name":"broccoli","last_name":"","username":"pwhbdev","language_code":"en","allows_write_to_pm":true}',
	// 		auth_date: '1730620541',
	// 		hash: '4965824bed402fa1cff5176384cca08779b512ed27792fe1074450d1bf728c3b'
	// 	}
	// };

	let initData;
	let user;
	let telegramUserInfo;
	let token = localStorage.getItem('token');
	let deviceId = localStorage.getItem('deviceId');
	let client = 'web';

	if (!deviceId)
	{
		deviceId = crypto.randomUUID();
		localStorage.setItem('deviceId', deviceId);
	}

	// DEBUG
	// client = res.client;
	// telegramUserInfo = res.telegramUserInfo;
	// token = res.token;
	// initData = res.initData;
	// DEBUG

	if (window.Telegram.WebApp && window.Telegram.WebApp.initData)
	{
		client = 'telegram';
		const query = new URLSearchParams(window.Telegram.WebApp.initData);
		initData = Object.fromEntries(query);
		telegramUserInfo = JSON.parse(initData.user);
		user = {
			username: telegramUserInfo.username
		};
		const authRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/auth/thirdparty/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${PUBLIC_BASIC_TOKEN}`
			},
			body: JSON.stringify({
				username: telegramUserInfo.username,
				password: String(telegramUserInfo.id),
				deviceId: deviceId
			})
		});
		const authData = await authRes.json();

		if (authData.ok)
		{
			token = authData.data.access_token as string;
			localStorage.setItem('token', token);
		}
	}

	const rosaryRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/rosaries/today`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const rosaryData = await rosaryRes.json();
	rosaryDataStore.set(rosaryData.data);
	return {
		client: client,
		telegramUserInfo: telegramUserInfo,
		user: user,
		token: token,
		deviceId: deviceId,
		initData: initData,
		rosaryData: rosaryData.data
	};
};
