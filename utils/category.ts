import Category, { CategoryAPI, CategoryIndex } from "../interface/Category"
import _ from "lodash"
import { NextRouter } from "next/router"

export function getCurrentSlugPath(router: NextRouter): string[] {
	const path = router.asPath.startsWith("/category/")
		? router.asPath.split("/").slice(2)
		: []
	return path
}

export function isChildCategory(parent: string[], child: string[]): boolean {
	let result =
		!_.isEqual(parent, child) &&
		_.isEqual(child.slice(0, parent.length), parent)
	return result
}

export function getCategoryIndex(
	categories: CategoryAPI[],
	slugPath: string[],
	categoryPath: Category[]
): CategoryIndex {
	const out: CategoryIndex = {}
	for (let i = 0; i < categories.length; i++) {
		const category: Category = {
			slug: categories[i].slug,
			title: categories[i].title,
			icon: categories[i].icon,
			devices: categories[i].devices,
			order: i,
			slugPath: [],
			categoryPath: [],
			subCategories: {},
		}
		category.slugPath = slugPath.concat([category.slug])
		category.categoryPath = categoryPath.concat([category])
		category.subCategories = getCategoryIndex(
			categories[i].subCategories,
			category.slugPath,
			category.categoryPath
		)
		out[category.slug] = category
	}
	return out
}
