import {
	ApplicationEnvironmentService,
	ApplicationLoggerService,
	Injectable,
	OnInit,
	OnShutdown,
} from 'lib'
import { Subject } from 'rxjs'

@Injectable
export class PrimaryService implements OnInit, OnShutdown {
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
		this.loggerService.log(`Core/PrimaryService initialized`)
	}
}
