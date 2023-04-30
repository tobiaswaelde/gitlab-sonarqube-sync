import enquirer from 'enquirer';
import { GitLab } from './services/gitlab';

async function prompt<T>(props: {
	name: string;
	message: string;
	initial?: T;
	validate?: (value: string) => boolean;
	required?: boolean;
}) {
	const res = await enquirer.prompt<{ [key: string]: T }>({ type: 'input', ...props });
	return res[props.name];
}

async function main() {
	// get gitlab project ID
	const gitlabProjectId = await prompt({
		name: 'gitlabProjectId',
		message: 'GitLab Project ID:',
		initial: 40586698,
		validate: (value) => value !== '' && !Number.isNaN(Number(value)),
		required: true,
	});

	// get gitlab project
	const gitlabProject = await GitLab.getProjectInfo(gitlabProjectId);
	console.log(gitlabProject);

	// create project on sonarqube

	// add sonarqube project to gitlab project

	// ask for badges to add
	// get badges from sonarqube
	// add badges to gitlab project
	// add badges to sonarqube
}

main();
