import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	let user;
	let token = localStorage.getItem('token');
	let deviceId = localStorage.getItem('deviceId');
	let initData;
	if (!deviceId) {
		deviceId = crypto.randomUUID();
		localStorage.setItem('deviceId', deviceId);
	}
	if (window.Telegram.WebApp && window.Telegram.WebApp.initData) {
		console.log('initData', window.Telegram.WebApp);

		const query = new URLSearchParams(window.Telegram.WebApp.initData);
		initData = Object.fromEntries(query);
		user = JSON.parse(initData.user);
		token = initData.hash;
	}

	return {
		title: 'Wuttyi',
		user: user,
		token: token,
		deviceId: deviceId,
		initData: initData
	};
};
