import { Application } from 'lib'
import { configuration } from './Configuration/configuration'
import { AppModule } from './app.module'

@Application({
	name: 'My Application',
	declare: [AppModule],
	configuration,
})
export class App {
	constructor() {}
}
