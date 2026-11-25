// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { auth } from '../../lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = async ({ request }: Parameters<PageServerLoad>[0]) => {


    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        redirect(303, '/');
    }

    return {
        userNumber: session.user.name,
        email: session.user.email
    };
};
