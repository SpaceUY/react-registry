/**
 * Defines the structure for common API error responses.
 */
export interface ApiErrorData {
	success: boolean;
	message: string;
	error: string;
	statusCode: number;
}

export interface ApiError {
	status: number;
	data: ApiErrorData;
}

/**
 * Type guard to check if an error object matches the expected ApiError structure.
 * This is useful for safely accessing nested properties like `error.data.message`
 * in RTK Query error handlers.
 *
 * @param error - The error object to check (typically of type `unknown` from a catch block).
 * @returns True if the error matches the ApiError structure, false otherwise.
 */
export const isApiError = (error: unknown): error is ApiError => {
	return (
		typeof error === "object" &&
		error !== null &&
		"status" in error &&
		typeof error.status === "number" &&
		"data" in error &&
		typeof error.data === "object" &&
		error.data !== null &&
		"message" in error.data &&
		typeof error.data.message === "string"
	);
};
