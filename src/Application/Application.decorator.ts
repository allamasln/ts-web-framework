import 'reflect-metadata'
import { ApplicationOptions } from './Application.types'

/**
 * Singleton for app context and configuration.
 * Provides a decorator to initialize with the given options.
 */

export class ApplicationContext {
	public readonly appClass?: { new (...args: any[]): {} }
	public readonly options?: ApplicationOptions

	constructor(
		appClass: { new (...args: any[]): {} },
		options: ApplicationOptions
	) {
		this.appClass = appClass
		this.options = options
	}
}

const _applicationContext: ApplicationContext =
	{} as ApplicationContext

export function getApplicationContext() {
	return _applicationContext
}

export function Application<T extends { new (...args: any[]): {} }>(
	options: ApplicationOptions
) {
	return function (constructor: T) {
		if (!_applicationContext.appClass) {
			Object.assign(_applicationContext, {
				appClass: constructor,
				options,
			})
		}
	}
}
