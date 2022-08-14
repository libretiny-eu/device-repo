import Category, { CategoryIndex } from "../../interface/Category"
import { slugify, useEffectUnmount } from "../../utils/utils"
import { useCore } from "../AppCore"
import DeviceEditable from "../device/new/DeviceEditable"
import EditableList, { EditableListItem } from "../parts/EditableList"
import CategoryPath from "./CategoryPath"
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	TextField,
} from "@mui/material"
import _ from "lodash"
import React, { Fragment } from "react"

const PATH = "categories"

export default function CategorySelector({ data }: { data: DeviceEditable }) {
	const core = useCore()
	let [value, error] = data.getValue<Category[]>(PATH)
	if (!value?.length) value = [null]

	useEffectUnmount(() => {
		// update error state on unmount; remove empty categories
		// filtering is done during DB saving - this is only for step navigation
		let [value, _error] = data.getValue<Category[]>(PATH)
		value = _.filter(value)
		data.setValue(PATH, value, value.length == 0)
	})

	function onUpdate(items: EditableListItem<Category, null>[]) {
		// set new page state; remove duplicate categories
		// do not remove empty categories, to make adding possible
		items = _.uniqBy(items, "item.slugPath")
		data.setValue(
			PATH,
			items.map((item) => item.item)
		)
		return items
	}

	function renderInput(params: AutocompleteRenderInputParams) {
		return (
			<TextField
				variant="standard"
				placeholder="Choose a category"
				required
				error={error}
				{...params}
			/>
		)
	}

	function render(
		key: string,
		category: Category,
		_type: null,
		update: (category: Category, _type?: null) => void
	) {
		const showInput =
			category === null || !_.isEmpty(category.subCategories)

		let categories: CategoryIndex
		if (category === null) categories = core?.categories ?? {}
		else categories = category.subCategories

		function categoryMap(category: Category) {
			return [category].concat(_.map(category.subCategories, categoryMap))
		}

		// calculate depth of current row's selected (valid) category
		const currentCategoryDepth = category?.categoryPath?.length ?? 0
		// make a flat map of all sub categories
		const categoriesFlat: Category[] = _.flattenDeep(
			_.map(categories, categoryMap)
		)
		// sort the resulting list
		const categoriesSorted = _.sortBy(categoriesFlat, [
			// put same-level categories first
			(category) =>
				category.categoryPath.length == currentCategoryDepth + 1
					? 0
					: 1,
			// order using same-level parent's order number
			(category) => category.categoryPath[currentCategoryDepth].order,
			// order by nesting depth
			(category) => category.categoryPath.length,
		])
		const options = categoriesSorted.map((item) =>
			// get absolute path
			item.categoryPath
				// make relative to same-level
				.slice(currentCategoryDepth)
				// get the titles
				.map((category) => category.title)
				// make it user friendly
				.join(" > ")
		)

		function onChoose(_event: any, newValue: string) {
			console.log("CategorySelector::onChoose(...,", newValue, ")")
			if (!newValue) return
			// split UI path
			const parts = newValue.split(" > ")
			// map as slug parts
			const slugPath = parts.map((part) => slugify(part))
			// get subcategory by object path
			const category = _.get(categories, slugPath.join(".subCategories."))
			update(category)
		}

		function onCategoryClick(category: Category) {
			console.log("CategorySelector::onCategoryClick(...,", category, ")")
			const parentPath = _.initial(category.categoryPath)
			const newCategory = parentPath.at(-1) ?? null
			update(newCategory)
		}

		return (
			<Fragment key={key}>
				{/* dummy paragraph to force row height */}
				<p style={{ width: 0 }}>&nbsp;</p>

				<CategoryPath category={category} onClick={onCategoryClick}>
					{showInput && (
						<Autocomplete
							disablePortal
							clearOnBlur
							autoHighlight
							options={options}
							sx={{ width: 300 }}
							renderInput={renderInput}
							onChange={onChoose}
						/>
					)}
				</CategoryPath>
			</Fragment>
		)
	}

	return (
		<EditableList
			items={value}
			render={render}
			getNewItem={() => null}
			onUpdate={onUpdate}
		/>
	)
}
