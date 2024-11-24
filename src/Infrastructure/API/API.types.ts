export enum APIOptions {
	'express',
	'fastify',
}

export enum httpMethod {
	GET,
	POST,
	PUT,
	PATCH,
	OPTIONS,
	DELETE,
}
export type ControllerHttpOptions = {
	path: string
	method: httpMethod
}

export type APIEnvironment = {
	port: number
	basePath: string
}
