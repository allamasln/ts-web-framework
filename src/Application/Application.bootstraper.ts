import { resolve } from '@/Injectable/Injectable.resolver'
import { Constructor } from '@/common/types'
import {
	ApplicationContext,
	getApplicationContext,
} from './Application.decorator'

export class Bootstraper {
	private _app: ApplicationContext

	constructor() {
		console.log('[Bootstraper]: Initializing Bootstraper...')

		this._app = getApplicationContext()
	}

	bootstrap(app: Constructor) {
		console.log('[Bootstraper]: Bootstrapping application...')
		console.log('[Bootstraper]: Application context:', this._app)

		resolve(app, getApplicationContext().globalDependencyContainer)

		console.log(
			'[Bootstraper]: Application bootstrapped successfully'
		)
	}
}
