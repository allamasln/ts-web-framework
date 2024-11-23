import { dependencyContainer } from './Injectable.container'
import { Constructor } from '@/common/types'

export function Injectable<T extends Constructor>(constructor: T) {
	dependencyContainer.register(constructor.name, constructor)
}
