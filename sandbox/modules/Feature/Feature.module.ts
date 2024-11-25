import { Module } from 'lib'
import { SomeService } from './Some/Some.service'
import { SomeController } from './Some/Some.controller'
import { AnotherController } from './Another/Another.controller'
import { AnotherService } from './Another/Another.service'

@Module({
	declare: [SomeService, AnotherService],
	controllers: [SomeController, AnotherController],
})
export class FeatureModule {}
