import { ApplicationConfiguration } from '@/Application/Application.types'
import { Injectable } from '@/Injectable/Injectable.decorator'
import { OnInit, OnShutdown } from '@/Injectable/Injectable.types'
import { Subject } from 'rxjs'

@Injectable
export class ApplicationConfigurationService
	implements OnInit, OnShutdown
{
	private declare configuration: ApplicationConfiguration
	$subject = new Subject<ApplicationConfiguration>()
	constructor() {}

	onInit(): void {
		this.$subject.next(this.configuration)
	}

	onShutdown(): void {
		this.$subject.complete()
	}

	set(configuration: ApplicationConfiguration) {
		this.configuration = configuration
		this.$subject.next(this.configuration)
	}

	get(): ApplicationConfiguration | undefined {
		return this.configuration
	}

	$() {
		return this.$subject
	}
}
