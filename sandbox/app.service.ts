import {
	ApplicationEnvironmentService,
	Injectable,
	OnInit,
	OnShutdown,
} from 'lib'
import { Subject } from 'rxjs'
import { ApplicationLoggerService } from '../src/Logger/Logger.service'

@Injectable
export class SomeService implements OnInit, OnShutdown {
	private $unsuscribeAll: Subject<void> = new Subject<void>()

	constructor(
		private loggerService: ApplicationLoggerService,
		private environmentService: ApplicationEnvironmentService
	) {}
	helthCheck() {
		return { success: true }
	}

	onShutdown(): void {
		this.$unsuscribeAll.next()
		this.$unsuscribeAll.complete()

		this.loggerService.log('Shutdown complete.')
	}

	onInit(): void {
		const environment =
			this.environmentService.get()?.logs.environment

		this.loggerService.log(`Environment: ${environment || 'unknown'}`)
	}
}
