import { AbstractController } from '@/Controller/Controller.definition'
import { Dictionary } from '@/common/types'
import express, { Express, Request, Response } from 'express'
import { Server } from 'http'
import { AbstractAPI } from './API.abstract'
import { httpMethod } from './API.types'
import path from 'path'

export class ExpressAPI extends AbstractAPI {
	declare app: Express
	declare server: Server
	constructor(port: number, modulePath: string = '') {
		super(port, modulePath)
		this.app = express()
	}

	mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void {
		controller.iterateEndpoint((endpoint) => {
			const controllerInstance = entityContainer[
				endpoint.controllerName
			] as AbstractController & any

			let finalPath = path
				.join(
					this.modulePath || '',
					controllerInstance.getBase() || '',
					endpoint.options.path
				)
				.replaceAll('\\', '/')

			const routeHandler = (req: Request, res: Response) => {
				controllerInstance[endpoint.function.name](req, res)
			}

			if (endpoint.options.method === httpMethod.GET)
				this.app.get(finalPath, routeHandler)

			console.info(`[API]: GET ${finalPath} Routed`)
		})
	}

	listen() {
		this.server = this.app.listen(this.port, () => {
			console.info(`[SERV] listening on port ${this.port}`)
		})
	}
}
