import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { prompt } from '../util/prompt';

export class Config {
	private static gitlabApiUrl: string;
	private static gitlabAccessToken: string;
	private static sonarqubeApiUrl: string;
	private static sonarqubeAccessToken: string;

	/** GitLab API endpoint */
	public static get GITLAB_API_URL(): string {
		return this.gitlabApiUrl;
	}
	/** GitLab access token with 'api' scope */
	public static get GITLAB_ACCESS_TOKEN(): string {
		return this.gitlabAccessToken;
	}
	/** SonarQube API endpoint */
	public static get SONARQUBE_API_URL(): string {
		return this.sonarqubeApiUrl;
	}
	/** SonarQube access token with 'Administer System' permission */
	public static get SONARQUBE_ACCESS_TOKEN(): string {
		return this.sonarqubeAccessToken;
	}

	private static readonly filepath = path.resolve(os.homedir(), '.gitlab-sonarqube-sync');

	public static async initialize() {
		this.loadConfigFile();

		if (!this.gitlabApiUrl) {
			this.gitlabApiUrl = await this.getGitlabApiUrl();
			this.saveConfigFile();
		}

		if (!this.gitlabAccessToken) {
			this.gitlabAccessToken = await this.getGitlabAccessToken();
			this.saveConfigFile();
		}

		if (!this.sonarqubeApiUrl) {
			this.sonarqubeApiUrl = await this.getSonarQubeApiUrl();
			this.saveConfigFile();
		}

		if (!this.sonarqubeAccessToken) {
			this.sonarqubeAccessToken = await this.getSonarQubeAccessToken();
			this.saveConfigFile();
		}
	}

	private static loadConfigFile() {
		if (fs.existsSync(this.filepath)) {
			const raw = fs.readFileSync(this.filepath);
			const json = JSON.parse(raw.toString());
			this.gitlabApiUrl = json.gitlabApiUrl;
			this.gitlabAccessToken = json.gitlabAccessToken;
			this.sonarqubeApiUrl = json.sonarqubeApiUrl;
			this.sonarqubeAccessToken = json.sonarqubeAccessToken;
		}
	}

	private static saveConfigFile() {
		const data = JSON.stringify({
			gitlabApiUrl: this.gitlabApiUrl,
			gitlabAccessToken: this.gitlabAccessToken,
			sonarqubeApiUrl: this.sonarqubeApiUrl,
			sonarqubeAccessToken: this.sonarqubeAccessToken,
		});
		fs.writeFileSync(this.filepath, data);
	}

	//#region prompts
	private static getGitlabApiUrl(): Promise<string> {
		return prompt<string>({
			type: 'input',
			name: 'getGitlabApiUrl',
			message: 'Enter GitLab API URL:',
			initial: 'https://gitlab.com/api/v4',
			required: true,
		});
	}

	private static getGitlabAccessToken(): Promise<string> {
		return prompt<string>({
			type: 'input',
			name: 'getGitlabAccessToken',
			message: 'GitLab Access Token',
			required: true,
		});
	}

	private static getSonarQubeApiUrl(): Promise<string> {
		return prompt<string>({
			type: 'input',
			name: 'getSonarQubeApiUrl',
			message: 'Enter SonarQube API URL:',
			initial: 'https://sonarqube.com',
			required: true,
		});
	}

	private static getSonarQubeAccessToken(): Promise<string> {
		return prompt<string>({
			type: 'input',
			name: 'getSonarQubeAccessToken',
			message: 'SonarQube Access Token',
			required: true,
		});
	}
	//#endregion
}
