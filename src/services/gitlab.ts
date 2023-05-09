import axios, { AxiosInstance } from 'axios';
import { GitLabProject } from '../types/gitlab';

export class GitLab {
	private static api: AxiosInstance = axios.create();

	public static initialize(apiUrl: string, accessToken: string) {
		this.api.defaults.baseURL = apiUrl;
		this.api.defaults.headers.Authorization = `Bearer ${accessToken}`;
	}

	public static async getProjectInfo(id: number): Promise<GitLabProject> {
		const res = await this.api.get(`/projects/${id}`);
		return res.data;
	}
}
