import { ApplicationEnvironment } from '@/Application/Application.types'
import { Injectable } from '@/Injectable/Injectable.decorator'
import { OnInit, OnShutdown } from '@/Injectable/Injectable.types'
import { Subject } from 'rxjs'

@Injectable
export class ApplicationEnvironmentService
	implements OnInit, OnShutdown
{
	private declare environment: ApplicationEnvironment
	private $subject = new Subject<ApplicationEnvironment>()

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
