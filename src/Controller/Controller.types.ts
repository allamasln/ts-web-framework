import { httpMethod } from '@/Infrastructure/API/API.types'

export type ControllerHttpOptions = {
	path: string
	method: httpMethod
}

export type HttpEndpoint = {
	options: ControllerHttpOptions
	function: Function
	controllerName: string
}
