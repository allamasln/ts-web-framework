import {
	ApplicationEnvironmentService,
	ApplicationLoggerService,
	Injectable,
	OnInit,
	OnShutdown,
} from 'lib'
import { Subject } from 'rxjs'

@Injectable
export class AnotherService implements OnInit, OnShutdown {
	private $unsuscribeAll: Subject<void> = new Subject<void>()

	constructor(private loggerService: ApplicationLoggerService) {}
	helthCheck() {
		return { success: true }
	}

	onShutdown(): void {
		this.$unsuscribeAll.next()
		this.$unsuscribeAll.complete()

		this.loggerService.log('Shutdown complete.')
	}

	onInit(): void {
		this.loggerService.log(`Feature/AnotherService initialized`)
	}
}
