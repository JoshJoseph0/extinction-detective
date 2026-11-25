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

set_env({MONGODB_URI:"mongodb+srv://joshjoseph24_db_user:m8VvvXK2GFXwEXsV@cluster0.yhxfywy.mongodb.net/afterlight?retryWrites=true&w=majority",BETTER_AUTH_SECRET:"e9a56dca06312998c5f21031dc152c830ddf1e61c7ca4ad36b4ab2cbebe7eb56",BETTER_AUTH_URL:"http://localhost:5173"});