import { cleanEnv, str } from 'envalid';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const ENV = cleanEnv(process.env, {
	GITLAB_API_URL: str({
		desc: 'GitLab API endpoint',
		default: 'https://gitlab.com/api/v4',
	}),
	GITLAB_ACCESS_TOKEN: str({
		desc: `GitLab access token with 'api' scope`,
	}),
	SONARQUBE_API_URL: str({
		desc: 'SonarQube API endpoint',
		default: 'https://sonarqube.com',
	}),
	SONARQUBE_ACCESS_TOKEN: str({
		desc: `SonarQube access token with 'Administer System' permission`,
	}),
});
