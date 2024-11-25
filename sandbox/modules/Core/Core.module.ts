import { Module } from 'lib'
import { PrimaryController } from './Primary/Primary.controller'
import { PrimaryService } from './Primary/Primary.service'

@Module({
	declare: [PrimaryService],
	controllers: [PrimaryController],
})
export class CoreModule {}
