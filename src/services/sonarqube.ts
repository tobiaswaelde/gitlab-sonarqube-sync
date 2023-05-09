import axios, { AxiosInstance } from 'axios';
import { CreateProjectParams, CreateProjectResponse, SonarQubeProject } from '../types/sonarqube';

export class SonarQube {
	private static api: AxiosInstance = axios.create();

	public static initialize(apiUrl: string, accessToken: string) {
		this.api.defaults.baseURL = apiUrl;
		this.api.defaults.headers.Authorization = `Bearer ${accessToken}`;
	}

	public static async createProject(data: CreateProjectParams): Promise<CreateProjectResponse> {
		const res = await this.api.post(`/api/projects/create`, data);
		return res.data;
	}

	public static async getProject(key: string): Promise<SonarQubeProject | undefined> {
		const res = await this.api.get(`/api/projects/search?projects=${key}`);
		if (res.status === 200 && res.data.components.length > 0) {
			return res.data.components[0] as SonarQubeProject;
		} else {
			return undefined;
		}
	}

	public static async getProjects(): Promise<SonarQubeProject[]> {
		const projects: SonarQubeProject[] = [];

		let moreAvailable = true;
		let page = 1;
		let pageSize = 5;
		try {
			while (moreAvailable) {
				const res = await this.api.get(`/api/projects/search?p=${page}&ps=${pageSize}`);

				if (res.data) {
					if (res.data.components.length < pageSize) {
						moreAvailable = false;
					} else {
						page++;
					}

					projects.push(...res.data.components);
				} else {
					moreAvailable = false;
				}
			}
		} catch (err) {}

		return projects;
	}
}
