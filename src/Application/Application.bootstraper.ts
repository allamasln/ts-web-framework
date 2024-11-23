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

		console.log(
			'[Bootstraper]: Application bootstrapped successfully'
		)
	}
}
