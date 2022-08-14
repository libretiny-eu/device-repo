import { pathsRecursive } from "./utils"
import _ from "lodash"

export default class Editable<Type extends {}> {
	_forceRender: (dummy: number) => void
	data: Type
	errors: Map<string, boolean>

	constructor(forceRender: (dummy: number) => void) {
		this._forceRender = forceRender
	}

	setData(data: Type) {
		this.data = data
		this.errors = new Map(
			_.map(pathsRecursive(data), (path) => [path, false])
		)
	}

	forceRender() {
		this._forceRender(new Date().getUTCMilliseconds())
	}

	getValue<Value>(
		path: string,
		defaultValue: Value = undefined
	): [Value, boolean] {
		const value = _.get(this.data, path, defaultValue)
		const error = this.errors?.get(path) ?? false
		return [value, error]
	}

	setValue<Value>(path: string, value: Value, error?: boolean) {
		_.set(this.data, path, value)
		this.errors?.set(path, error ?? false)
		if (error !== undefined) this.forceRender()
	}

	hasErrors(...paths: string[]) {
		return _.some(paths, (path) => this.errors?.get(path) ?? false)
	}
}
