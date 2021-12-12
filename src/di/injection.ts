import {
	cleanParameter,
	getContainer,
	getOrSetIdFromCache
} from "inversify-props";

export function lazyInject(): PropertyDecorator {
	return (target: any, key: PropertyKey): any => {
		if (typeof key !== "string")
			throw new Error('Only "string" is supported');

		const typeName = Reflect.getMetadata("design:type", target, key).name;
		const id = getOrSetIdFromCache(cleanParameter(typeName));

		Object.defineProperty(target, key, {
			get(this: any) {
				return getContainer().get(id);
			},
			enumerable: true,
			configurable: true
		});
	};
}
