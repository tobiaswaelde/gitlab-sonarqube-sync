import { Config } from './services/config';
import { GitLab } from './services/gitlab';
import { Prompts } from './services/prompts';
import { getSonarqubeConfig } from './util/fs';
import { SonarQube } from './services/sonarqube';
import { SonarQubeProject } from './types/sonarqube';

async function main() {
	try {
		await Config.initialize();
		GitLab.initialize(Config.GITLAB_API_URL, Config.GITLAB_ACCESS_TOKEN);
		SonarQube.initialize(Config.SONARQUBE_API_URL, Config.SONARQUBE_ACCESS_TOKEN);

		//#region get or create SonarQube project
		const sqConfig = getSonarqubeConfig();
		let sqProject: SonarQubeProject | undefined = undefined;

		// check if SonarQube project exist
		if (sqConfig) {
			sqProject = await SonarQube.getProject(sqConfig['sonar.projectKey']);
			if (sqProject) {
				console.log(`SonarQube project found: ${sqProject.name}`);
			}
		}
		if (!sqProject) {
			const createNew = await Prompts.askToCreateSonarqubeProject();
			if (createNew) {
				// create project on sonarqube
			} else {
				// select sonarqube project
				const availableProjects = await SonarQube.getProjects();
				sqProject = await Prompts.selectProject(availableProjects);
				console.log(sqProject);
			}
		}
		//#endregion

		// get gitlab project
		const gitlabProjectId = await Prompts.getGitlabProjectId();
		const gitlabProject = await GitLab.getProjectInfo(gitlabProjectId);

		// add sonarqube project to gitlab project

		// ask for badges to add
		// get badges from sonarqube
		// add badges to gitlab project
		// add badges to readme
	} catch (err) {
		process.exit(0);
	}
}

main();
