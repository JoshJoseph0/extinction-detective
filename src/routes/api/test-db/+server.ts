import { json } from '@sveltejs/kit';
import { db } from '../../../lib/server/mongodb';

export async function GET() {
    try {
        await db.command({ ping: 1 });

        return json({
            connected: true
        });
    } catch {
        return json({
            connected: false
        }, { status: 500 });
    }
}