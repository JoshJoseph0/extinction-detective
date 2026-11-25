import { t as dynamic_private_env } from "./config.js";
import { MongoClient } from "mongodb";
// .svelte-kit/generated/build/env/private/server.js
var MONGODB_URI = dynamic_private_env.MONGODB_URI;
var BETTER_AUTH_SECRET = dynamic_private_env.BETTER_AUTH_SECRET;
var BETTER_AUTH_URL = dynamic_private_env.BETTER_AUTH_URL;
// src/lib/server/mongodb.ts
if (!MONGODB_URI) throw new Error("Missing MongoDB connection string");
var client = new MongoClient(MONGODB_URI);
var db = client.db("afterlight");
export { BETTER_AUTH_URL as i, db as n, BETTER_AUTH_SECRET as r, client as t };

//# sourceMappingURL=mongodb.js.map