import { variables } from "../../../../src/env.ts";
import { validate, handle_issues } from '@sveltejs/kit/internal/env';

const issues = {};

export { variables }

export const dynamic_private_env = {};

export const explicit_public_env = {};

export const rendered_env = {};

handle_issues(issues);

export function set_env(env) {
	const issues = {};
	const MONGODB_URI = validate(variables, env.MONGODB_URI, "MONGODB_URI", issues);
	dynamic_private_env.MONGODB_URI = MONGODB_URI;
	const BETTER_AUTH_SECRET = validate(variables, env.BETTER_AUTH_SECRET, "BETTER_AUTH_SECRET", issues);
	dynamic_private_env.BETTER_AUTH_SECRET = BETTER_AUTH_SECRET;
	const BETTER_AUTH_URL = validate(variables, env.BETTER_AUTH_URL, "BETTER_AUTH_URL", issues);
	dynamic_private_env.BETTER_AUTH_URL = BETTER_AUTH_URL;
	handle_issues(issues);
}