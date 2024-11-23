import { Constructor } from '@/common/types'

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
