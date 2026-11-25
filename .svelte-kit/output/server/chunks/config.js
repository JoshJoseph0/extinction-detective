import { defineEnvVars } from "@sveltejs/kit/env";
import { handle_issues, validate } from "@sveltejs/kit/internal/env";
// src/env.ts
var variables = defineEnvVars({
	MONGODB_URI: { schema: (value) => value },
	BETTER_AUTH_SECRET: { schema: (value) => value },
	BETTER_AUTH_URL: { schema: (value) => value }
});
// .svelte-kit/generated/build/env/config.js
var issues = {};
var dynamic_private_env = {};
var explicit_public_env = {};
var rendered_env = {};
handle_issues(issues);
function set_env(env) {
	const issues = {};
	dynamic_private_env.MONGODB_URI = validate(variables, env.MONGODB_URI, "MONGODB_URI", issues);
	dynamic_private_env.BETTER_AUTH_SECRET = validate(variables, env.BETTER_AUTH_SECRET, "BETTER_AUTH_SECRET", issues);
	dynamic_private_env.BETTER_AUTH_URL = validate(variables, env.BETTER_AUTH_URL, "BETTER_AUTH_URL", issues);
	handle_issues(issues);
}
export { variables as a, set_env as i, explicit_public_env as n, rendered_env as r, dynamic_private_env as t };

//# sourceMappingURL=config.js.map