import { ApplicationEnvironment } from 'lib'

export const environment: ApplicationEnvironment = {
	api: {
		port: 3001,
		basePath: '/api',
	},
	logs: {
		name: 'Some Service',
		environment: 'dev',
		send: true,
	},
}
