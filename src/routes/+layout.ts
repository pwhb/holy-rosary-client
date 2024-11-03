import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) =>
{
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

	if (window.Telegram.WebApp && window.Telegram.WebApp.initData)
	{
		client = 'telegram';
		const query = new URLSearchParams(window.Telegram.WebApp.initData);
		initData = Object.fromEntries(query);
		telegramUserInfo = JSON.parse(initData.user);
		user = {
			username: telegramUserInfo.username
		};
	}


	return {
		client: client,
		telegramUserInfo: telegramUserInfo,
		user: user,
		token: token,
		deviceId: deviceId,
		initData: initData,
	};
};
