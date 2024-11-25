import {
	AbstractController,
	Controller,
	ControllerHttpEndpoint,
	httpMethod,
	Request,
	Response,
} from 'lib'

import { AnotherService } from './Another.service'

@Controller
export class AnotherController extends AbstractController {
	constructor(private anotherService: AnotherService) {
		super()
		this.setBase('core/another')
	}

	@ControllerHttpEndpoint({
		method: httpMethod.GET,
		path: '/',
	})
	async healthCheck(req: Request, res: Response) {
		res.send(this.anotherService.helthCheck())
	}
}
