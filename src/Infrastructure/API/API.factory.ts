import { APIOptions } from './API.types'
import { ExpressAPI } from './ExpressApi'

export class APIFactory {
	static create(apiFramework: APIOptions): any {
		switch (apiFramework) {
			case APIOptions.express:
				return new ExpressAPI(3001)

			default:
				throw new Error('Unsupported API Framework')
		}
	}
}
