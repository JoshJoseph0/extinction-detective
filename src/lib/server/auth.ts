//imports from ai reaserch
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$app/env/private';
//import database allready made
import { client, db } from './mongodb';

if (!BETTER_AUTH_SECRET) {
  throw new Error('Missing Better Auth secret');
}

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  ...(BETTER_AUTH_URL ? { baseURL: BETTER_AUTH_URL } : {}),
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
}
});