import { Controller } from 'lib'

import { SomeService } from './app.service'

@Controller
export class SomeController {
	constructor(private someService: SomeService) {
		console.log({ someService })
	}
}
