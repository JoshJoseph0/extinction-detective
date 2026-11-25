import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/env';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
  if (building) return resolve(event);

  const { auth } = await import('./lib/server/auth');
  return svelteKitHandler({
    event,
    resolve,
    auth,
    building
  });
};