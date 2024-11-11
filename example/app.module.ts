import { Module } from '../src/Module/Module.decorators'
import { SomeService } from './app.service'

@Module({
	declare: [SomeService],
})
export class AppModule {
	constructor() {
		console.log('AppModule initialized!')
	}
}
