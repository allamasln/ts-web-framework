import { Injectable } from 'lib'

@Injectable
export class SomeService {
	constructor() {}
	helthCheck() {
		return { success: true }
	}
}
