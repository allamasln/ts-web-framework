import { ConfigurationBootstraper } from '@/Configuration/Configuration.bootstraper'
import { EnvironmentBootstraper } from '@/Environment/Environment.bootstraper'
import { ApplicationEnvironmentService } from '@/Environment/Environment.service'
import { AbstractAPI } from '@/Infrastructure/API/API.abstract'
import { APIFactory } from '@/Infrastructure/API/API.factory'
import { resolve } from '@/Injectable/Injectable.resolver'
import { Constructor } from '@/common/types'
import {
	ApplicationContext,
	getApplicationContext,
} from './Application.decorator'

export class Bootstraper {
	private app: ApplicationContext

	constructor() {
		this.app = getApplicationContext()
	}

	bootstrap(rootModule: Constructor) {
		console.info('[Bootstraper]: Starting bootstrap process...')

		resolve(rootModule, this.app.globalDependencyContainer)

		this.setupConfiguration()
		this.setupEnvironment()

		const environmentService = this.loadEnvironmentService()

		console.info(
			'[Bootstraper]: Application initialized successfully.'
		)

		const api = this.mountAPI(environmentService)
		api.listen()

		this.app.init()

		this.setupShutdown(api)
	}

	private setupConfiguration(): void {
		console.info('[Bootstraper]: Setting up configuration...')

		const configurationBootstraper = new ConfigurationBootstraper(
			this.app.getOptions()?.configuration!,
			this.app.globalDependencyContainer[
				'ApplicationConfigurationService'
			]
		)

		configurationBootstraper.bootstrap()
	}

	private setupEnvironment(): void {
		console.info('[Bootstraper]: Setting up environment...')

		const environmentBootstraper = new EnvironmentBootstraper(
			this.app.getOptions()?.environment!,
			this.app.globalDependencyContainer[
				'ApplicationEnvironmentService'
			]
		)

		environmentBootstraper.bootstrap()
	}

	private loadEnvironmentService(): ApplicationEnvironmentService {
		return this.app.globalDependencyContainer[
			'ApplicationEnvironmentService'
		] as ApplicationEnvironmentService
	}

	private mountAPI(
		environmentService: ApplicationEnvironmentService
	) {
		console.info('[Bootstraper]: Setting up API...')

		const apiConfig = this.app.getOptions()?.configuration.api!
		const { port, basePath } = environmentService.get()?.api || {}

		const api = APIFactory.create(apiConfig, port!, basePath!)

		this.app.mount(api)

		return api
	}

	private setupShutdown(api: AbstractAPI) {
		process.on('SIGTERM', async () => {
			try {
				console.log('[Bootstraper]: Shutting down...')

				await api.shutdown()

				this.app.shutdown()
			} catch (error) {
				console.error('[Bootstraper]: Error during shutdown:', error)
			} finally {
				console.log('[Bootstraper]: Graceful shutdown complete, bye.')
				process.exit(0)
			}
		})
	}
}
