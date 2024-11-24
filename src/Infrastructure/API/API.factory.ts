import { AbstractAPI } from './API.abstract'
import { APIOptions } from './API.types'
import { ExpressAPI } from './ExpressApi'

export class APIFactory {
	static create(
		apiFramework: APIOptions,
		port: number,
		modulePath?: string
	): AbstractAPI {
		switch (apiFramework) {
			case APIOptions.express:
				return new ExpressAPI(port, modulePath)

			default:
				throw new Error('Unsupported API Framework')
		}
	}
}
