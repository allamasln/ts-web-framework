import { Application } from 'lib'
import { AppModule } from './app.module'

@Application({
	name: 'My Application',
	declare: [AppModule],
})
export class App {
	constructor() {}
}
