import { ConfigurationBootstraper } from '@/Configuration/Configuration.bootstraper'
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

	bootstrap(app: Constructor) {
		console.log('[Bootstraper]: Bootstrapping application...')

		resolve(app, getApplicationContext().globalDependencyContainer)

		const confBootstraper = new ConfigurationBootstraper(
			this.app.getOptions()!.configuration,
			this.app.globalDependencyContainer[
				'ApplicationConfigurationService'
			]
		)

		console.log('[Bootstraper]: Initializing configuration...')
		confBootstraper.bootstrap()

		console.log(
			'[Bootstraper]: Application bootstrapped successfully'
		)

		let api = APIFactory.create(
			this.app.getOptions()?.configuration.api!
		)

		this.app.mount(api)

		api.listen()
	}
}
