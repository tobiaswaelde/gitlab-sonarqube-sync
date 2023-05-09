import Enquirer from 'enquirer';
import { PromptOptions } from '../types/enquirer';

export async function prompt<T>(props: PromptOptions) {
	const res = await Enquirer.prompt<{ [key: string]: T }>(props);

	if (typeof props.name === 'string') {
		return res[props.name];
	} else {
		return res[props.name()];
	}
}
