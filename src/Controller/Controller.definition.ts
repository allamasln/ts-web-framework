import { HttpEndpoint } from './Controller.types'

export class AbstractController {
	private httpEndpoints: HttpEndpoint[] = []
	private declare base: string

	setBase(base: string): void {
		this.base = base
	}
	getBase(): string {
		return this.base
	}

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
