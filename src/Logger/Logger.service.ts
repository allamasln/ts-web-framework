import { ApplicationEnvironment } from '@/Application/Application.types'
import { ApplicationEnvironmentService } from '@/Environment/Environment.service'
import { Injectable } from '@/Injectable/Injectable.decorator'
import { OnInit, OnShutdown } from '@/Injectable/Injectable.types'
import { Subject, takeUntil } from 'rxjs'
import { LoggerEnvironment } from './Logger.types'

@Injectable
export class ApplicationLoggerService implements OnInit, OnShutdown {
	declare config: LoggerEnvironment

	private $unsuscribeAll: Subject<void> = new Subject<void>()

	constructor(private envService: ApplicationEnvironmentService) {
		this.initializeConfigSubscription()
	}
	onShutdown(): void {
		this.$unsuscribeAll.next()
		this.$unsuscribeAll.complete()
	}
	onInit(): void {}

	private initializeConfigSubscription(): void {
		this.envService
			.$()
			.pipe(takeUntil(this.$unsuscribeAll))
			.subscribe(({ logs }: ApplicationEnvironment) => {
				this.config = logs
			})
	}

	private sendLog(level: 'log' | 'info' | 'error', ...args: any[]) {
		if (!this.config.send) return

		if (level === 'log' && this.config.environment === 'prod') return
		console[level](`:: [SERV ${this.config.name}] ::`, ...args)
	}

	log(...args: any[]) {
		this.sendLog('log', ...args)
	}
	info(...args: any[]) {
		this.sendLog('info', ...args)
	}
	error(...args: any[]) {
		this.sendLog('error', ...args)
	}
}
