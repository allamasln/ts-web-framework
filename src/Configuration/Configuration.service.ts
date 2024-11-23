import { Subject } from 'rxjs'
import { ApplicationConfiguration } from '@/Application/Application.types'
import { Injectable } from '@/Injectable/Injectable.decorator'

@Injectable
export class ApplicationConfigurationService {
	private declare _configuration: ApplicationConfiguration
	$subject = new Subject<ApplicationConfiguration>()
	constructor() {}

	onInit(): void {
		this.$subject.next(this._configuration)
	}

	onShutdown(): void {
		this.$subject.complete()
	}

	set(configuration: ApplicationConfiguration) {
		this._configuration = configuration
		this.$subject.next(this._configuration)
	}

	get(): ApplicationConfiguration | undefined {
		return this._configuration
	}

	$() {
		return this.$subject
	}
}
