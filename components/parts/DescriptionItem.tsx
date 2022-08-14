import { Alert, AlertColor, TextField } from "@mui/material"
import _ from "lodash"
import React, { useState } from "react"

export default function DescriptionItem({
	text,
	type,
	error,
	onBlur,
}: {
	text: string
	type: AlertColor | null
	error: boolean
	onBlur: (value: string) => void
}) {
	const [showError, setShowError] = useState(error)

	const textField = (
		<TextField
			variant="standard"
			defaultValue={text}
			multiline
			error={showError}
			onChange={() => setShowError(false)}
			onBlur={(event) => onBlur(event.target.value)}
		/>
	)

	if (type) return <Alert severity={type}>{textField}</Alert>
	return textField
}
