import { Module } from 'lib'
import { SomeController } from './app.controller'
import { SomeService } from './app.service'

@Module({
	declare: [SomeService],
	controllers: [SomeController],
})
export class AppModule {}
