import {
	AbstractController,
	Controller,
	ControllerHttpEndpoint,
	httpMethod,
	Request,
	Response,
} from 'lib'

import { SomeService } from './Some.service'

@Controller
export class SomeController extends AbstractController {
	constructor(private someService: SomeService) {
		super()
		this.setBase('core')
	}

	@ControllerHttpEndpoint({
		method: httpMethod.GET,
		path: '/some',
	})
	async healthCheck(req: Request, res: Response) {
		res.send(this.someService.helthCheck())
	}
}
