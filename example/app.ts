import { Application } from '../src/Application/Application.decorator'
import { AppModule } from './app.module'

@Application({
	name: 'My Application',
	declare: [AppModule],
})
export class App {
	constructor() {
		console.log('App initialized!')
	}
}
