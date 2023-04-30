import axios from 'axios';
import { ENV } from '../config/env';
import { GitLabProject } from '../types/gitlab';

export class GitLab {
	private static api = axios.create({
		baseURL: ENV.GITLAB_API_URL,
		headers: {
			'PRIVATE-TOKEN': ENV.GITLAB_ACCESS_TOKEN,
		},
	});

	public static async getProjectInfo(id: number): Promise<GitLabProject> {
		const res = await this.api.get(`/projects/${id}`);
		return res.data;
	}
}
