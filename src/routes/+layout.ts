import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const configRes = await fetch(
		`${PUBLIC_BACKEND_URL}/api/v1/configs/getConfigByCode/FRONTEND_CONFIG`
	);
	const configData = await configRes.json();

	const rosaryConfigRes = await fetch(
		`${PUBLIC_BACKEND_URL}/api/v1/configs/getConfigByCode/ROSARY_CONFIG`
	);
	const rosaryConfigData = await rosaryConfigRes.json();

	return {
		lang: configData.data.value.defaultLanguage,
		FRONTEND_CONFIG: configData.data,
		ROSARY_CONFIG: rosaryConfigData.data
	};
};
