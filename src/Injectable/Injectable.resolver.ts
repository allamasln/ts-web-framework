import 'reflect-metadata'
import { Constructor, Dictionary } from '@/common/types'
import { dependencyContainer } from './Injectable.container'

export function resolve(
	dependentClass: Constructor,
	context: Dictionary,
	parentContext?: Dictionary
) {
	if (!dependentClass) return

	console.log(
		`[resolve]: Resolving dependencies for ${dependentClass.name}`
	)

	const dependencies: Constructor[] =
		Reflect.getMetadata('design:paramtypes', dependentClass) || []

	// Resolve each dependency recursively
	dependencies.forEach((dependencyClass) => {
		// Get the context for injecting the dependency.
		const resolvedContext =
			parentContext && !parentContext[dependencyClass.name]
				? parentContext
				: context

		const isResolved =
			context[dependencyClass.name] ||
			(parentContext && parentContext[dependencyClass.name])

		if (!isResolved) {
			console.log(
				`[resolve]: Resolving dependency ${dependencyClass.name} for ${dependentClass.name}`
			)

			const dependencyInstance = dependencyContainer.get(
				dependencyClass.name
			)

			if (dependencyInstance) {
				resolve(dependencyClass, resolvedContext)
			} else {
				console.error(
					`[resolve]: Dependency ${dependencyClass.name} not found`
				)
			}
		}
	})

	// Instantiate the class and inject dependencies if not already resolved.
	if (!context[dependentClass.name]) {
		console.log(`[resolve]: Instantiating ${dependentClass.name}`)

		// Get dependency from current or parent context.
		const getDependencyInstance = (dependencyClass: Constructor) =>
			context[dependencyClass.name] ||
			parentContext?.[dependencyClass.name]

		const dependencyInstances = dependencies.map(
			getDependencyInstance
		)

		context[dependentClass.name] = new dependentClass(
			...dependencyInstances
		)
	}
}
