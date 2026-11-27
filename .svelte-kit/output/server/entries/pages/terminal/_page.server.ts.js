import { t as auth } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
// src/routes/terminal/+page.server.ts
var load = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) redirect(303, "/");
	return {
		userNumber: session.user.name,
		email: session.user.email
	};
};
export { load };

//# sourceMappingURL=_page.server.ts.js.map