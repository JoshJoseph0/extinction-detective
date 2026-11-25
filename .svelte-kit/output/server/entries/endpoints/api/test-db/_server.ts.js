import { n as db } from "../../../../chunks/mongodb.js";
import { json } from "@sveltejs/kit";
// src/routes/api/test-db/+server.ts
async function GET() {
	try {
		await db.command({ ping: 1 });
		return json({ connected: true });
	} catch {
		return json({ connected: false }, { status: 500 });
	}
}
export { GET };

//# sourceMappingURL=_server.ts.js.map