import { writable } from "svelte/store";

export const appConfigsStore = writable<{
    FRONTEND_CONFIG: any;
    ROSARY_CONFIG: any;
}>();

export const loadingStore = writable<boolean>(true);