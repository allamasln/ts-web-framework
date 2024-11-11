import { Constructor, Dictionary } from '@/common/types'

export class InjectableContainer {
	private dependencyContainer: Dictionary = {}

	register(token: string, constructor: Constructor) {
		this.dependencyContainer[token] = constructor
	}

	get(name?: string): Dictionary | any {
		if (name) return { [name]: this.dependencyContainer[name] }

		return this.dependencyContainer
	}
}

// Singleton instance of the dependency container
export const dependencyContainer = new InjectableContainer()
