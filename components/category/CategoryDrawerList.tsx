import { CategoryIndex } from "../../interface/Category"
import CategoryItemDrawer from "./CategoryDrawerItem"
import _ from "lodash"
import React, { Fragment } from "react"

export default function CategoryDrawerList({
	categories,
	dense,
}: {
	categories: CategoryIndex
	dense?: boolean
}) {
	const list = _.sortBy(categories, "order")
	return (
		<Fragment>
			{list.map((category, i) => (
				<CategoryItemDrawer
					key={i.toString()}
					category={category}
					dense={dense}
				/>
			))}
		</Fragment>
	)
}
