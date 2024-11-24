import { Subject } from 'rxjs'
import { ApplicationEnvironment } from '@/Application/Application.types'
import { Injectable } from '@/Injectable/Injectable.decorator'

@Injectable
export class ApplicationEnvironmentService {
	private declare environment: ApplicationEnvironment
	private $subject = new Subject<ApplicationEnvironment>()
	constructor() {}

	onInit(): void {}

	onShutdown(): void {
		this.$subject.complete()
	}

	set(environment: ApplicationEnvironment) {
		this.environment = environment
		this.$subject.next(this.environment)
	}

	get(): ApplicationEnvironment | undefined {
		return this.environment
	}

	$() {
		return this.$subject
	}
}
