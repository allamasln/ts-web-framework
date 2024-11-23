import {
	addModuleContext,
	getApplicationContext,
} from '@/Application/Application.decorator'
import { resolve } from '@/Injectable/Injectable.resolver'
import { Constructor, Dictionary } from '@/common/types'
import { ModuleConfiguration } from './Module.types'

// Context for managing module-specific dependencies.
export class ModuleContext {
	public readonly moduleClass?: Constructor
	public readonly options?: ModuleConfiguration
	public readonly moduleDependencyContainer: Dictionary

	constructor(
		moduleClass: Constructor,
		options: ModuleConfiguration
	) {
		this.moduleClass = moduleClass
		this.options = options
		this.moduleDependencyContainer = {}
	}

	init() {
		this.options?.declare?.forEach((dependency) => {
			resolve(
				dependency,
				this.moduleDependencyContainer,
				getApplicationContext().globalDependencyContainer
			)
		})

		this.options?.controllers?.forEach((dependency) => {
			resolve(
				dependency,
				this.moduleDependencyContainer,
				getApplicationContext().globalDependencyContainer
			)
		})
	}
}

export function Module<T extends Constructor>(
	options: ModuleConfiguration
) {
	return function (constructor: T) {
		let moduleContext = new ModuleContext(constructor, options)
		moduleContext.init()
		addModuleContext(moduleContext)

		console.log(`[@Module]: Loaded ${constructor.name}`)
	}
}
