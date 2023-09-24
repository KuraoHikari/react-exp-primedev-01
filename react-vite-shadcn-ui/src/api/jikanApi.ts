import ky from "ky";

const baseUrl = import.meta.env.VITE_APP_BASE_JIKAN_URL;
const baseJikanApi = ky.create({ prefixUrl: baseUrl });

export default baseJikanApi;
