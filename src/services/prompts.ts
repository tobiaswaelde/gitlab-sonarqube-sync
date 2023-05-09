import { SonarQubeProject } from '../types/sonarqube';
import { prompt } from '../util/prompt';

export class Prompts {
	public static async getGitlabProjectId(): Promise<number> {
		return await prompt<number>({
			type: 'input',
			name: 'gitlabProjectId',
			message: 'GitLab Project ID:',
			initial: 40586698,
			validate: (value) => value !== '' && !Number.isNaN(Number(value)),
			required: true,
		});
	}

	public static async askToCreateSonarqubeProject(): Promise<boolean> {
		const res = await prompt({
			type: 'select',
			name: 'createSonarqubeProject',
			message: 'Create or select sonarqube project',
			choices: ['Create new project', 'Select existing project'],
			required: true,
		});

		return res === 'Create new project';
	}

	public static async selectProject(
		projects: SonarQubeProject[]
	): Promise<SonarQubeProject | undefined> {
		const res = await prompt({
			type: 'select',
			name: 'selectSonarqubeProject',
			message: 'Select SonarQube Project',
			choices: projects.map((x) => ({ value: x.key, name: x.name })),
			required: true,
		});

		console.log(res);
		return;
	}
}
