import 'reflect-metadata'

export { Request, Response } from 'express'

export { Bootstraper } from '@/Application/Application.bootstraper'

export { Application } from '@/Application/Application.decorator'
export { Injectable } from '@/Injectable/Injectable.decorator'
export { Module } from '@/Module/Module.decorators'
export {
	Controller,
	ControllerHttpEndpoint,
} from '@/Controller/Controller.decorator'

export { AbstractController } from '@/Controller/Controller.definition'

export {
	ApplicationConfiguration,
	ApplicationEnvironment,
} from '@/Application/Application.types'

export { OnInit, OnShutdown } from '@/Injectable/Injectable.types'

export { ApplicationEnvironmentService } from '@/Environment/Environment.service'
export { ApplicationLoggerService } from '@/Logger/Logger.service'

export {
	httpMethod,
	APIOptions,
} from '@/Infrastructure/API/API.types'
