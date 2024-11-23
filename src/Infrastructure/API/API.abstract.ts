import { AbstractController } from '@/Controller/Controller.definition'
import { Dictionary } from '@/common/types'

interface API {
	mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void
	listen(): void
}

export abstract class AbstractAPI implements API {
	port: number

	constructor(port: number) {
		this.port = port
	}
	abstract mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void

	abstract listen(): void
}
