import { ApplicationConfiguration } from '@/Application/Application.types'
import { ApplicationConfigurationService } from './Configuration.service'

export class ConfigurationBootstraper {
	constructor(
		private configuration: ApplicationConfiguration,
		private service: ApplicationConfigurationService
	) {}

	bootstrap() {
		this.service.set(this.configuration)
	}
}
