import { HttpEndpoint } from './Controller.types'

export class AbstractController {
	private httpEndpoints: HttpEndpoint[] = []

	setHttpEndpoints(httpEndpoints?: HttpEndpoint[]) {
		if (httpEndpoints) {
			this.httpEndpoints = httpEndpoints
		}
	}

	iterateEndpoint(fn: (endpoint: HttpEndpoint) => void) {
		this.httpEndpoints.forEach((endpoint) => {
			let endpointWithMiddle = endpoint as HttpEndpoint
			fn(endpointWithMiddle)
		})
	}
}
