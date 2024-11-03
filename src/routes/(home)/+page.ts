import { page } from '$app/stores';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ data }) =>
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

	// DEBUG
	// client = res.client;
	// telegramUserInfo = res.telegramUserInfo;
	// token = res.token;
	// initData = res.initData;
	// DEBUG

	console.log("data", data);

	return {};
};
