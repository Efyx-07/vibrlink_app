export const backendUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;
export const apiUrl: string = '/vl'; // modification pour utilisation avec le proxy (voir next.config.ts)
export const appUrl: string | undefined = process.env.NEXT_PUBLIC_APP_URL;

export const siteName: string = 'VibrLink';

export const currentYear: number = new Date().getFullYear();
