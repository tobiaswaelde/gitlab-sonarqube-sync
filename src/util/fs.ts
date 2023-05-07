import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

export function getSonarqubeConfig() {
	const filename = path.resolve(process.cwd(), 'sonar-project.properties');
	const content = fs.readFileSync(filename);

	const env = dotenv.parse(content);
	const config = cleanEnv(env, {
		'sonar.projectKey': str({ default: undefined }),
	});

	return config;
}
