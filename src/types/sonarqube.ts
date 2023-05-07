export type Visibility = 'public' | 'private';
export type Qualifier = 'TRK' | 'VW' | 'APP';

export type CreateProjectParams = {
	/** Key of the main branch of the project. If not provided, the default main branch key will be used. */
	mainBranch: string;

	/** Name of the project. If name is longer than 500, it is abbreviated. */
	name: string;

	/** Key of the project */
	project: string;

	/**
	 * Whether the created project should be visible to everyone, or only specific user/groups.
	 *
	 * If no visibility is specified, the default project visibility will be used.
	 */
	visibility?: Visibility;
};
export type CreateProjectResponse = {
	[project: string]: {
		key: string;
		name: string;
		qualifier: string;
	};
};

export type SonarQubeProject = {
	key: string;
	name: string;
	qualifier: Qualifier;
	lastAnalysisDate: string;
	revision: string;
};
