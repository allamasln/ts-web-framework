import { ApplicationOptions } from './Application.types'
import { Constructor, Dictionary } from '@/common/types'

export class ApplicationContext {
	private appClass?: Constructor
	private options?: ApplicationOptions
	public readonly globalDependencyContainer: Dictionary = {}

	initialize(appClass: Constructor, options: ApplicationOptions) {
		if (!this._isInitialized()) {
			this.appClass = appClass
			this.options = options
			console.log('[ApplicationContext]: Initialized successfully.')
		} else {
			console.log(
				'[ApplicationContext]: Already initialized, skipping setup.'
			)
		}
	}

	_isInitialized(): boolean {
		return !!this.appClass
	}
}

// Singleton instance of the application context
const _applicationContext: ApplicationContext =
	new ApplicationContext()

export function getApplicationContext(): ApplicationContext {
	return _applicationContext
}

export function Application<T extends Constructor>(
	options: ApplicationOptions
) {
	return function (constructor: T) {
		console.log(
			'[Application]: Attempting to initialize application context...'
		)
		_applicationContext.initialize(constructor, options)
	}
}
