import { GitLab } from './services/gitlab';
import { Prompts } from './services/prompts';

async function main() {
	// get gitlab project ID
	const gitlabProjectId = await Prompts.getGitlabProjectId();

	// get gitlab project
	const gitlabProject = await GitLab.getProjectInfo(gitlabProjectId);
	// console.log(gitlabProject);

	// create project on sonarqube
	const createNew = await Prompts.askToCreateSonarqubeProject();
	console.log(createNew);

	// add sonarqube project to gitlab project

	// ask for badges to add
	// get badges from sonarqube
	// add badges to gitlab project
	// add badges to sonarqube
}

main();
