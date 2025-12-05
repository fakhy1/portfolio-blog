export const load = async ({ locals }) => {
	return {
		auth: {
			user: locals.user,
			session: locals.session,
			isAuthenticated: locals.isAuthenticated
		}
	};
};
