import _ from "lodash"
import { useEffect } from "react"

export function slugify(s: string): string {
	s = _.deburr(s)
	s = s.toLowerCase().replace(/[^a-z0-9-]/g, " ")
	s = s.trim().replace(/\s+/g, "-")
	return s.trim()
}

export function pathsRecursive(obj: {}, path: string[] = []): string[] {
	return _.flatMap(obj, (value, key) => {
		const thisPath = path.concat([key])
		if (_.isPlainObject(value)) return pathsRecursive(value, thisPath)
		return thisPath.join(".")
	})
}

export function useEffectUnmount(block: () => void) {
	useEffect(() => block, [])
}
