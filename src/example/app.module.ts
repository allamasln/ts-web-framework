import { Module } from 'lib'
import { SomeService } from './app.service'

@Module({
	declare: [SomeService],
})
export class AppModule {
	constructor() {}
}
