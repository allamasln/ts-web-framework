import { ApplicationConfigurationService } from '@/Configuration/Configuration.service'
import { ApplicationEnvironmentService } from '@/Environment/Environment.service'
import { AbstractAPI } from '@/Infrastructure/API/API.abstract'
import { resolve } from '@/Injectable/Injectable.resolver'
import { ApplicationLoggerService } from '@/Logger/Logger.service'
import { ModuleContext } from '@/Module/Module.decorators'
import { Constructor, Dictionary } from '../common/types'
import { ApplicationOptions } from './Application.types'

export class ApplicationContext {
	private appClass?: Constructor
	private options?: ApplicationOptions
	private modules: ModuleContext[] = []
	public readonly globalDependencyContainer: Dictionary = {}

	initialize(appClass: Constructor, options: ApplicationOptions) {
		if (this._isInitialized()) {
			console.log(
				'[ApplicationContext]: Already initialized, skipping setup.'
			)
			return
		}

		this.appClass = appClass
		this.options = options

		this._resolveGlobalServices()
	}

	getOptions() {
		return this.options
	}

	_isInitialized(): boolean {
		return !!this.appClass
	}

	mount(api: AbstractAPI) {
		this.modules.forEach((module) => {
			module.mountControllers(api)
		})
	}

	private _resolveGlobalServices() {
		resolve(
			ApplicationConfigurationService,
			this.globalDependencyContainer
		)

		resolve(
			ApplicationEnvironmentService,
			this.globalDependencyContainer
		)

		resolve(ApplicationLoggerService, this.globalDependencyContainer)

		console.log('[ApplicationContext]: Global services resolved.')
	}

	addModule(module: ModuleContext) {
		this.modules.push(module)
	}

	shutdown() {
		this.modules.forEach((module) => module.onShutdown())

		for (let dependency in this.globalDependencyContainer) {
			if (this.globalDependencyContainer[dependency].onShutdown)
				this.globalDependencyContainer[dependency].onShutdown()
		}
	}

	init() {
		this.modules.forEach((module) => module.onInit())

		for (let dependency in this.globalDependencyContainer) {
			if (this.globalDependencyContainer[dependency].onInit)
				this.globalDependencyContainer[dependency].onInit()
		}
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
		console.log('[ApplicationContext]: Initialized successfully.')
	}
}
