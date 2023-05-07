import { GitLab } from './services/gitlab';
import { Prompts } from './services/prompts';
import { getSonarqubeConfig } from './util/fs';
import { SonarQube } from './services/sonarqube';
import { SonarQubeProject } from './types/sonarqube';

async function main() {
	const sqConfig = getSonarqubeConfig();
	const sqProjectKey: string | undefined = sqConfig['sonar.projectKey'];
	let sqProject: SonarQubeProject | undefined = undefined;

	// get gitlab project ID
	const gitlabProjectId = await Prompts.getGitlabProjectId();

	// get gitlab project
	const gitlabProject = await GitLab.getProjectInfo(gitlabProjectId);

	// check if SonarQube project exist
	if (sqProjectKey) {
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

	// add sonarqube project to gitlab project

	// ask for badges to add
	// get badges from sonarqube
	// add badges to gitlab project
	// add badges to sonarqube
}

main();
