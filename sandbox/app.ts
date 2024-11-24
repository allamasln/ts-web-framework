import { Application } from 'lib'
import { configuration } from './Configuration/configuration'
import { AppModule } from './app.module'
import { environment } from './Environment/environment'

@Application({
	name: 'My Application',
	declare: [AppModule],
	configuration,
	environment,
})
export class App {
	constructor() {}
}
