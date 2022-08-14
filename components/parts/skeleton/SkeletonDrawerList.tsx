import SkeletonDrawerItem from "./SkeletonDrawerItem"
import { Fragment } from "react"

export default function SkeletonDrawerList({ dense }: { dense?: boolean }) {
	return (
		<Fragment>
			{new Array(10).fill(0).map((_, i) => (
				<SkeletonDrawerItem key={i.toString()} dense={dense} />
			))}
		</Fragment>
	)
}
