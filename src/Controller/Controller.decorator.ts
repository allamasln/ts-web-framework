import { Constructor } from '@/common/types'
import { AbstractController } from './Controller.definition'
import {
	ControllerHttpOptions,
	HttpEndpoint,
} from './Controller.types'

const _controllers: {
	[controllerName: string]: {
		controllerClass: Constructor
	}
} = {}

export function Controller<T extends Constructor>(constructor: T) {
	if (!_controllers[constructor.name]) {
		_controllers[constructor.name] = {
			controllerClass: constructor,
		}
	}
}

export function getController(controllerName: string) {
	return _controllers[controllerName]
}

const _httpEndpoints: { [controller: string]: HttpEndpoint[] } = {}

export function ControllerHttpEndpoint(
	options: ControllerHttpOptions
) {
	return function <T extends AbstractController>(
		target: T,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if (!_httpEndpoints[target.constructor.name]) {
			_httpEndpoints[target.constructor.name] = []
		}
		_httpEndpoints[target.constructor.name].push({
			options,
			function: descriptor.value!,
			controllerName: target.constructor.name,
		})
	}
}

export function getEndpoint(controllerName: string) {
	return _httpEndpoints[controllerName]
}
