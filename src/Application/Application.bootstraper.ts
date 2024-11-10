import {
	getApplicationContext,
	ApplicationContext,
} from './Application.decorator'

export class Bootstraper {
	private _app: ApplicationContext

	constructor() {
		this._app = getApplicationContext()
	}

	bootstrap(mainModule: any) {
		console.log({
			mainModule,
			options: this._app.options,
		})
	}
}
