import {
	AbstractController,
	Controller,
	ControllerHttpEndpoint,
	httpMethod,
	Request,
	Response,
} from 'lib'

import { SomeService } from './app.service'

@Controller
export class SomeController extends AbstractController {
	constructor(private someService: SomeService) {
		super()
	}

	@ControllerHttpEndpoint({
		method: httpMethod.GET,
		path: '/healthcheck',
	})
	async healthCheck(req: Request, res: Response) {
		res.send(this.someService.helthCheck())
	}
}
