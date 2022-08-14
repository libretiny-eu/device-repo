import Editable from "../../utils/Editable"
import { useEffectUnmount } from "../../utils/utils"
import DescriptionItem from "./DescriptionItem"
import EditableList, { EditableListItem } from "./EditableList"
import ErrorOutline from "@mui/icons-material/ErrorOutline"
import InfoOutlined from "@mui/icons-material/InfoOutlined"
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined"
import TaskAltOutlined from "@mui/icons-material/TaskAltOutlined"
import { AlertColor, ListItemIcon, Menu, MenuItem } from "@mui/material"
import _ from "lodash"
import React from "react"

const ALERT_TYPES = ["info!", "warning!", "success!", "error!"]

export default function DescriptionEditor<
	Type extends { description: string[] }
>({
	data,
	path = "description",
	required,
}: {
	data: Editable<Type>
	path?: string
	required?: boolean
}) {
	let [value, error] = data.getValue<string[]>(path)
	if (!value?.length) value = [""]

	useEffectUnmount(() => {
		// update error state on unmount; remove empty rows and empty alerts
		// filtering is done during DB saving - this is only for step navigation
		let [value, _error] = data.getValue<string[]>(path)
		value = _.filter(
			value,
			(text) => !!text && !ALERT_TYPES.includes(text.trim())
		)
		data.setValue(path, value, required && value.length == 0)
	})

	function onUpdate(items: EditableListItem<string, AlertColor>[]) {
		console.log("DescriptionEditor::onUpdate(", items, ")")
		// set new page state
		// do not remove empty rows, to make adding possible
		data.setValue(
			path,
			items.map((item) =>
				item.type ? `${item.type}!${item.item}` : item.item
			)
		)
	}

	function render(
		key: string,
		text: string,
		type: AlertColor,
		update: (text: string, type: AlertColor) => void
	) {
		return (
			<DescriptionItem
				key={key}
				text={text}
				type={type}
				error={error}
				onBlur={(text) => update(text, type)}
			/>
		)
	}

	function renderTypeMenu(
		anchor: HTMLElement | null,
		onSelect: (type: AlertColor) => void,
		onClose: () => void
	) {
		return (
			<Menu anchorEl={anchor} open={!!anchor} onClose={onClose}>
				<MenuItem onClick={() => onSelect(null)}>
					<ListItemIcon />
					Paragraph (description)
				</MenuItem>
				<MenuItem onClick={() => onSelect("info")}>
					<ListItemIcon>
						<InfoOutlined />
					</ListItemIcon>
					Information block
				</MenuItem>
				<MenuItem onClick={() => onSelect("warning")}>
					<ListItemIcon>
						<ReportProblemOutlined />
					</ListItemIcon>
					Warning block
				</MenuItem>
				<MenuItem onClick={() => onSelect("success")}>
					<ListItemIcon>
						<TaskAltOutlined />
					</ListItemIcon>
					Success block
				</MenuItem>
				<MenuItem onClick={() => onSelect("error")}>
					<ListItemIcon>
						<ErrorOutline />
					</ListItemIcon>
					Error block
				</MenuItem>
			</Menu>
		)
	}

	const texts: string[] = []
	const types: AlertColor[] = []

	for (const row of value) {
		if (_.some(ALERT_TYPES, (type) => row.toLowerCase().startsWith(type))) {
			// alert block
			const [type, text] = row.split("!", 2)
			texts.push(text.trim())
			types.push(type.toLowerCase() as AlertColor)
		} else {
			// description block
			texts.push(row)
			types.push(null)
		}
	}

	return (
		<EditableList
			items={texts}
			types={types}
			render={render}
			renderTypeMenu={renderTypeMenu}
			getNewItem={() => ""}
			onUpdate={onUpdate}
		/>
	)
}
