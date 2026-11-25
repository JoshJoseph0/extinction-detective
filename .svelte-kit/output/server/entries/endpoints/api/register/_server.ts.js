import { n as db } from "../../../../chunks/mongodb.js";
import { json } from "@sveltejs/kit";
import { randomBytes } from "node:crypto";
// src/routes/api/register/+server.ts
var POST = async ({ request }) => {
	const body = await request.json();
	const realEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(realEmail)) return json({
		success: false,
		error: "Invalid email address"
	}, { status: 400 });
	const investigators = db.collection("investigators");
	if (await investigators.findOne({ realEmail }, { projection: { _id: 1 } })) return json({
		success: false,
		error: "An account already exists with this email"
	}, { status: 409 });
	const { auth } = await import("../../../../chunks/auth.js");
	const counter = await db.collection("counters").findOneAndUpdate({ _id: "investigators" }, { $inc: { sequence: 1 } }, {
		upsert: true,
		returnDocument: "after"
	});
	if (!counter) return json({
		success: false,
		error: "Unable to generate investigator number"
	}, { status: 500 });
	const userNumber = `INV-${String(counter.sequence).padStart(4, "0")}`;
	const companyEmail = `${userNumber.toLowerCase()}@afterlight.invalid`;
	const accessCode = randomBytes(16).toString("hex").toUpperCase();
	const registeredUser = await auth.api.signUpEmail({ body: {
		name: userNumber,
		email: companyEmail,
		password: accessCode
	} });
	await investigators.insertOne({
		authUserId: registeredUser.user.id,
		realEmail,
		companyEmail,
		userNumber,
		createdAt: /* @__PURE__ */ new Date()
	});
	return json({
		success: true,
		email: realEmail,
		userNumber,
		companyEmail,
		accessCode
	});
};
export { POST };

//# sourceMappingURL=_server.ts.js.map