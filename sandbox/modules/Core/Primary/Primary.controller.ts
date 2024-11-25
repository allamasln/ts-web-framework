import {
	AbstractController,
	Controller,
	ControllerHttpEndpoint,
	httpMethod,
	Request,
	Response,
} from 'lib'

import { PrimaryService } from './Primary.service'

@Controller
export class PrimaryController extends AbstractController {
	constructor(private primaryService: PrimaryService) {
		super()
		this.setBase('feature')
	}

	@ControllerHttpEndpoint({
		method: httpMethod.GET,
		path: '/primary',
	})
	async healthCheck(req: Request, res: Response) {
		res.send(this.primaryService.helthCheck())
	}
}
