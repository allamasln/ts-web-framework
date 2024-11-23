import { AbstractController } from '@/Controller/Controller.definition'
import { Dictionary } from '@/common/types'
import express, { Express, Request, Response } from 'express'
import { Server } from 'http'
import { AbstractAPI } from './API.abstract'
import { httpMethod } from './API.types'

export class ExpressAPI extends AbstractAPI {
	declare app: Express
	declare server: Server
	constructor(port: number) {
		super(port)
		this.app = express()
	}

	mount(
		controller: AbstractController,
		entityContainer: Dictionary
	): void {
		controller.iterateEndpoint(
			({ options, function: fn, controllerName }) => {
				const { method, path } = options

				const controllerInstance = entityContainer[
					controllerName
				] as AbstractController & any

				const routeHandler = (req: Request, res: Response) => {
					controllerInstance[fn.name](req, res)
				}

				if (method === httpMethod.GET)
					this.app.get(path, routeHandler)

				console.info(`[API]: GET ${path} Routed`)
			}
		)
	}

	listen() {
		this.server = this.app.listen(this.port, () => {
			console.info(`[SERVER] listening on port ${this.port}`)
		})
	}
}
