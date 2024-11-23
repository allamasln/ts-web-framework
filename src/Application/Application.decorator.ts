import { ModuleContext } from '@/Module/Module.decorators'
import { ApplicationOptions } from './Application.types'
import { Constructor, Dictionary } from '@/common/types'

export class ApplicationContext {
	private appClass?: Constructor
	private options?: ApplicationOptions
	private modules: ModuleContext[] = []
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

	addModule(module: ModuleContext) {
		this.modules.push(module)
	}
}

// Singleton instance of the application context
const _applicationContext: ApplicationContext =
	new ApplicationContext()

export function getApplicationContext(): ApplicationContext {
	return _applicationContext
}

export function addModuleContext(module: ModuleContext) {
	_applicationContext.addModule(module)
}

export function Application<T extends Constructor>(
	options: ApplicationOptions
) {
	return function (constructor: T) {
		_applicationContext.initialize(constructor, options)
		//console.log({ _applicationContext })
	}
}
