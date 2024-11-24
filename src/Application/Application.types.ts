import {
	APIEnvironment,
	APIOptions,
} from '@/Infrastructure/API/API.types'

export type ApplicationConfiguration = {
	api?: APIOptions
}

export type ApplicationEnvironment = {
	api: APIEnvironment
}

export type ApplicationOptions = {
	name: string
	declare: any[]
	configuration: ApplicationConfiguration
	environment: ApplicationEnvironment
}
