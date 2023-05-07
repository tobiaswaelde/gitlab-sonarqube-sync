import enquirer from 'enquirer';
import { PromptOptions } from '../types/enquirer';

export class Prompts {
	private static async prompt<T>(props: PromptOptions) {
		const res = await enquirer.prompt<{ [key: string]: T }>(props);

		if (typeof props.name === 'string') {
			return res[props.name];
		} else {
			return res[props.name()];
		}
	}

	public static async getGitlabProjectId(): Promise<number> {
		return await this.prompt<number>({
			type: 'input',
			name: 'gitlabProjectId',
			message: 'GitLab Project ID:',
			initial: 40586698,
			validate: (value) => value !== '' && !Number.isNaN(Number(value)),
			required: true,
		});
	}

	public static async askToCreateSonarqubeProject(): Promise<boolean> {
		const res = await this.prompt({
			type: 'select',
			name: 'createSonarqubeProject',
			message: 'Create or select sonarqube project',
			choices: ['Create new project', 'Select existing project'],
			required: true,
		});

		return res === 'Create new project';
	}
}
