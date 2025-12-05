export interface Post {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	slug: string;
	image: string;
	content: string;
	isPublished: boolean;
}

// ********************************************* //
// ******************** API ******************** //
// ********************************************* //

export type ApiError = {
	message: string;
	code: string;
};

export interface ApiSuccessResponse<T> {
	data: T;
	error: null;
}

export interface ApiErrorResponse {
	data: null;
	error: ApiError;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
