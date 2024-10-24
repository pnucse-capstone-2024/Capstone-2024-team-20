// import {
//   getExistToken, getTokenExpireDate, setToken,
// } from '../utils/auth';
// import { fetchWithHandler } from '../utils/fetchWithHandler';
// import { deployInstance } from './instance';

// export async function setupInterceptor() {
//   const { reissue } = await import('auth/reissue');

//   deployInstance.interceptors.request.use(
//     async (config) => {
//       const tokenExpireDate = getTokenExpireDate();

//       if (tokenExpireDate < Date.now()) {
//         const accessToken = getExistToken();

//         await fetchWithHandler(() => reissue({ accessToken }), {
//           onSuccess: (response) => {
//             setToken({
//               grantType: response.data.grantType,
//               accessToken: response.data.accessToken,
//               accessTokenExpiresIn: response.data.accessTokenExpiresIn,
//             });
//           },
//           onError: (error) => {
//             throw error;
//           },
//         });
//       }

//       const token = getExistToken();

//       const newConfig = config;
//       newConfig.headers.Authorization = `Bearer ${token}`;

//       return newConfig;
//     },
//     (error) => Promise.reject(error),
//   );
// }
