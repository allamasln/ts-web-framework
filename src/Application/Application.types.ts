import { APIOptions } from '@/Infrastructure/API/API.types'

export type ApplicationOptions = {
	name: string
	declare: any[]
	configuration: ApplicationConfiguration
}

export type ApplicationConfiguration = {
	api?: APIOptions
}
