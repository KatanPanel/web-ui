/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { VuexModule } from "vuex-module-decorators";
import { Container, interfaces } from "inversify";
import {
	cleanParameter,
	getContainer,
	getOrSetIdFromCache
} from "inversify-props";
import { Constructor, Instantiable } from "@/ioc/utils";

export interface KatanContainer {
	readonly container: Container;

	get<T>(constructor: Constructor<T>): T;

	bind<T>(constructor: Constructor<T>): interfaces.BindingWhenOnSyntax<T>;

	bindValue<T>(constructor: Constructor<T> | symbol, value: T): void;

	bindAll(constructors: Constructor[]): void;

	bindStoreLazy<T extends VuexModule>(
		constructor: Constructor<T>,
		root?: Constructor<T>
	): interfaces.BindingWhenOnSyntax<T>;

	bindDynamic<T>(
		constructor: Constructor<T> | symbol,
		value: (context: interfaces.Context) => T
	): interfaces.BindingWhenOnSyntax<T>;

	bindFactory<T>(
		constructor: Instantiable<T>,
		factory: interfaces.FactoryCreator<T>
	): interfaces.BindingWhenOnSyntax<T>;
}

export function lazyInject(): PropertyDecorator {
	return (target: any, key: PropertyKey): any => {
		if (typeof key !== "string")
			throw new Error("Only string type supported");

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
