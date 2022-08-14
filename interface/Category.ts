import { DeviceBase } from "./Device"

export type CategoryBase = {
	slug: string
	title: string
	icon?: string
	devices: DeviceBase[]
}

export type CategoryAPI = CategoryBase & {
	subCategories: CategoryAPI[]
}

export type CategoryIndex = {
	[key: string]: Category
}

type Category = CategoryBase & {
	order: number
	slugPath: string[]
	categoryPath: Category[]
	subCategories: CategoryIndex
}

export default Category
