import { ApplicationEnvironment } from '@/Application/Application.types'
import { ApplicationEnvironmentService } from './Environment.service'

export class EnvironmentBootstraper {
	constructor(
		private environment: ApplicationEnvironment,
		private service: ApplicationEnvironmentService
	) {}

	bootstrap() {
		this.populateEnvVariables(this.environment, 'SERV')
		this.service.set(this.environment)
	}

	private populateEnvVariables(
		config: Record<string, any>,
		prefix: string
	) {
		for (const [key, defaultValue] of Object.entries(config)) {
			const envKey = `${prefix}_${key.toUpperCase()}`

			if (typeof defaultValue === 'object' && defaultValue !== null) {
				// Process nested configuration objects
				this.populateEnvVariables(defaultValue, envKey)
			} else {
				process.env[envKey] ??= String(defaultValue)

				// Update the configuration to reflect the resolved value
				const envValue = process.env[envKey]!
				config[key] = this.castType(envValue, defaultValue)
			}
		}
	}

	private castType(value: string, original: any) {
		switch (typeof original) {
			case 'number':
				return Number(value)
			case 'boolean':
				return value.toLowerCase() === 'true'
			default:
				return value
		}
	}
}
