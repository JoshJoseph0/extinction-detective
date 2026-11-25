//this hole page took me 3 hours, this is not okay


import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/mongodb';
import type { RequestHandler } from './$types';
import { randomBytes } from 'node:crypto';
//this imports auth i made earler in the day, god it was hard to do though

//i need a cup of tea lol
export const POST: RequestHandler = async ({ request }) => {


    
    const body = await request.json();

    const realEmail =
        typeof body.email === 'string'
            ? body.email.trim().toLowerCase()
            : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(realEmail)) {
        return json({
            success: false,
            error: 'Invalid email address'
        }, { status: 400 });
    }

    const investigators = db.collection('investigators');
    const existingUser = await investigators.findOne(
        { realEmail },
        { projection: { _id: 1 } }
    );

    if (existingUser) {
        return json({
            success: false,
            error: 'An account already exists with this email'
        }, { status: 409 });
    }

    const { auth } = await import('../../../lib/server/auth');

    const counters = db.collection<{
        _id: string;
        sequence: number;
    }>('counters');

    const counter = await counters.findOneAndUpdate(
        { _id: 'investigators' },
        { $inc: { sequence: 1 } },
        {
            upsert: true,
            returnDocument: 'after'
        }
    );

    if (!counter) {
        return json({
            success: false,
            error: 'Unable to generate investigator number'
        }, { status: 500 });
    }

    const userNumber =
        `INV-${String(counter.sequence).padStart(4, '0')}`;

        //make the users comopany email 
    const companyEmail =
    `${userNumber.toLowerCase()}@afterlight.invalid`;
        //making strange user code, looks like there are more imployes, seems safer as well
    const accessCode = randomBytes(16)
    .toString('hex')
    .toUpperCase();
    const registeredUser = await auth.api.signUpEmail({
    body: {
        name: userNumber,
        email: companyEmail,
        password: accessCode
    }
});
await investigators.insertOne({
    authUserId: registeredUser.user.id,
    realEmail,
    companyEmail,
    userNumber,
    createdAt: new Date()
});
return json({
    success: true,
    email: realEmail,
    userNumber: userNumber,
    companyEmail,
    accessCode
});
};