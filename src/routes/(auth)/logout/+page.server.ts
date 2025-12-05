import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, ...rest }) => {
  if (!locals.session) {
    return fail(401);
  }
  await auth.invalidateSession(locals.session.id);
  auth.deleteSessionTokenCookie({ locals, ...rest });

  return redirect(302, '/');
}