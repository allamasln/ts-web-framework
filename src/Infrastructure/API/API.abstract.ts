import { AbstractController } from '@/Controller/Controller.definition'
import { Dictionary } from '@/common/types'

interface API {
	mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void
	listen(): void
	shutdown(): Promise<void>
}

export abstract class AbstractAPI implements API {
	protected port: number
	protected modulePath?: string

	constructor(port: number, modulePath?: string) {
		this.port = port
		this.modulePath = modulePath
	}
	abstract mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void

	abstract listen(): void
	abstract shutdown(): Promise<void>
}
