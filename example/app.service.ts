import { Injectable } from '../src/Injectable/Injectable.decorator'

@Injectable
export class SomeService {
	constructor() {
		console.log('SomeService initialized!')
	}
}
