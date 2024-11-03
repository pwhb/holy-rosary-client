import { writable } from 'svelte/store';

export const rosaryDataStore = writable<{
	_id: string;
	prayers: any[];
}>();

export const createNewPrayerStore = writable<boolean>(false);
