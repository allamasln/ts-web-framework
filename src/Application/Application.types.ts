import {
	APIEnvironment,
	APIOptions,
} from '@/Infrastructure/API/API.types'
import { LoggerEnvironment } from '@/Logger/Logger.types'

export type ApplicationConfiguration = {
	api?: APIOptions
}

export type ApplicationEnvironment = {
	api: APIEnvironment
	logs: LoggerEnvironment
}

export type ApplicationOptions = {
	name: string
	declare: any[]
	configuration: ApplicationConfiguration
	environment: ApplicationEnvironment
}
