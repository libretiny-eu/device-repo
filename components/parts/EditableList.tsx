import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import HighlightOff from "@mui/icons-material/HighlightOff"
import { Divider, IconButton, List, ListItem } from "@mui/material"
import _ from "lodash"
import { nanoid } from "nanoid"
import React, { useState } from "react"

export type EditableListItem<Item, Type> = {
	key: string
	item: Item
	type: Type
}

export default function EditableList<Item, Type>({
	items: itemsInit,
	types: typesInit = [],
	render,
	renderEmpty = () => <p>Empty</p>,
	renderTypeMenu = null,
	getNewItem,
	getCanAdd = () => true,
	getCanRemove = (_index: number, items: Item[]) => items.length > 1,
	onUpdate,
}: {
	items: Item[]
	types?: Type[]
	render: (
		key: string,
		item: Item,
		type: Type,
		update: (item: Item, type?: Type) => void
	) => React.ReactElement
	renderEmpty?: () => React.ReactElement
	renderTypeMenu?: (
		anchor: HTMLElement | null,
		onSelect: (type: Type) => void,
		onClose: () => void
	) => React.ReactElement
	getNewItem: (index: number, type: Type) => Item
	getCanAdd?: (index: number, items: Item[]) => boolean
	getCanRemove?: (index: number, items: Item[]) => boolean
	onUpdate?: (
		items: EditableListItem<Item, Type>[]
	) => EditableListItem<Item, Type>[] | void
}) {
	type DataType = EditableListItem<Item, Type>

	const [data, setData] = useState<DataType[]>(() => {
		// map initial items and their types to DataType[]
		return _.zip(itemsInit, typesInit).map(([item, type]) => ({
			key: nanoid(),
			item,
			type,
		}))
	})
	const [[anchor, anchorIndex], setAnchor] = useState<
		[HTMLElement | null, number]
	>([null, 0])

	function dispatchUpdate() {
		console.log("EditableList::dispatchUpdate()")
		const updated = (onUpdate && onUpdate(data)) || data
		setData([...updated])
	}

	function itemAdd(index: number, type: Type) {
		console.log("EditableList::itemAdd(", index, ",", type, ")")
		const item = getNewItem(index, type)
		data.splice(index, 0, { key: nanoid(), item, type })
		dispatchUpdate()
	}

	function itemUpdate(index: number, item: Item, type?: Type) {
		console.log(
			"EditableList::itemUpdate(",
			index,
			",",
			item,
			",",
			type,
			")"
		)
		data[index].item = item
		data[index].type = type ?? null
		dispatchUpdate()
	}

	function itemRemove(index: number) {
		console.log("EditableList::itemRemove(", index, ")")
		data.splice(index, 1)
		dispatchUpdate()
	}

	function onAddClick(
		index: number,
		event: React.MouseEvent<HTMLButtonElement>
	) {
		console.log("EditableList::onAddClick(", index, ", ...)")
		if (renderTypeMenu) setAnchor([event.currentTarget, index])
		else itemAdd(index, null)
	}

	function onRemoveClick(
		index: number,
		event: React.MouseEvent<HTMLButtonElement>
	) {
		console.log("EditableList::onRemoveClick(", index, ", ...)")
		itemRemove(index)
	}

	function onTypeClick(index: number, type: Type) {
		console.log("EditableList::onTypeClick(", index, ",", type, ")")
		itemAdd(index, type)
		setAnchor([null, 0])
	}

	function onMenuClose() {
		console.log("EditableList::onMenuClose()")
		setAnchor([null, 0])
	}

	const rows = data.length == 0 ? [null] : data
	const items = data.map((dataItem) => dataItem.item)

	return (
		<List disablePadding dense>
			{_.map(rows, (row, index) => (
				<ListItem key={row?.key} sx={{ border: "0px solid red" }}>
					<IconButton
						onClick={onRemoveClick.bind(null, index)}
						disabled={!getCanRemove(index, items)}
					>
						<HighlightOff />
					</IconButton>
					<IconButton
						onClick={onAddClick.bind(null, index + 1)}
						disabled={!getCanAdd(index, items)}
					>
						<AddCircleOutline />
					</IconButton>

					{renderTypeMenu &&
						renderTypeMenu(
							anchor,
							onTypeClick.bind(null, anchorIndex),
							onMenuClose
						)}

					<Divider
						orientation="vertical"
						flexItem
						sx={{ mt: 1, mb: 1, ml: 1, mr: 2 }}
					/>

					{row === null
						? renderEmpty()
						: render(
								row.key,
								row.item,
								row.type,
								itemUpdate.bind(null, index)
						  )}
				</ListItem>
			))}
		</List>
	)
}
