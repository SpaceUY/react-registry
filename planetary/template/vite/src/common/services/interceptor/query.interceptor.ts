// Update with the correct HTTP library based on project requirements

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { backUrl } from "@/environment";
// import { Routes } from "@/common/types/routes";
// import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// export async function interceptor(args: any, api: any, extraOptions: any) {
// 	const token = localStorage.getItem("token") || "";
// 	try {
// 		const result = await fetchBaseQuery({
// 			baseUrl: `${backUrl}/`,
// 			prepareHeaders: (headers: any) => {
// 				headers.set("authorization", `Bearer ${token}`);
// 				return headers;
// 			},
// 		})(args, api, extraOptions);

// 		if (
// 			result.error &&
// 			(result.error.status === 401 || result.error.status === 403)
// 		) {
// 			localStorage.removeItem("token");
// 			window.location.href = Routes.Signup;
// 		}

// 		return result;
// 	} catch (error) {
// 		return api.rejectWithValue(error);
// 	}
// }
