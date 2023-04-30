import axios from 'axios';
import { ENV } from '../config/env';
import { CreateProjectParams, CreateProjectResponse } from '../types/sonarqube';

export class SonarQube {
	private static api = axios.create({
		baseURL: ENV.SONARQUBE_API_URL,
		headers: {
			Authorization: `Bearer ${ENV.SONARQUBE_ACCESS_TOKEN}`,
		},
	});

	public static async createProject(data: CreateProjectParams): Promise<CreateProjectResponse> {
		const res = await this.api.post(`/api/projects/create`, data);
		return res.data;
	}
}
