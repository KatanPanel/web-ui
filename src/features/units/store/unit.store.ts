import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import appStore from "@/store";
import { Unit } from "@/features/units/models/unit.model";

@Module({
	name: "units",
	namespaced: true,
	dynamic: true,
	store: appStore
})
export default class UnitStore extends VuexModule {
	private _unit: Unit | null = null;

	public get getUnit(): Unit | null {
		return this._unit;
	}

	@Mutation
	public updateUnit(payload: { unit: Unit | null }): void {
		this._unit = payload.unit;
	}
}
