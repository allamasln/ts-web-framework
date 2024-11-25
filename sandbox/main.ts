import { Application } from 'lib'
import { configuration } from './Configuration/configuration'
import { CoreModule } from './modules/Core/Core.module'
import { FeatureModule } from './modules/Feature/Feature.module'
import { environment } from './Environment/environment'

@Application({
	name: 'My Application',
	declare: [CoreModule, FeatureModule],
	configuration,
	environment,
})
export class Main {
	constructor() {}
}
