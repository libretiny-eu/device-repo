import Editable from "../../utils/Editable"
import { useEffectUnmount } from "../../utils/utils"
import { Grid, TextField, TextFieldProps } from "@mui/material"
import _ from "lodash"
import React, { useState } from "react"

const sizes = {
	1: { xs: 12 },
	2: { xs: 12, sm: 6 },
	3: { xs: 12, sm: 6, md: 4 },
}

export default function TextFieldWrapper<Data>({
	id,
	placeholder,
	required,
	weightSum = 1,
	data,
	verify,
	transform,
	...props
}: TextFieldProps & {
	weightSum?: number
	data: Editable<Data>
	verify?: (value: string) => boolean
	transform?: (value: string) => string
}) {
	const [value, error] = data.getValue<string>(id, "")
	const [showError, setShowError] = useState(required && error)

	function checkValue(value: string): [string, boolean] {
		if (transform) value = transform(value)
		if (verify) return [value, !verify(value)]
		return [value, required && !value]
	}

	useEffectUnmount(() => {
		// update error state on unmount - this is only for step navigation
		const [value, _error] = data.getValue<string>(id)
		data.setValue(id, ...checkValue(value))
	})

	const additionalProps = { id, placeholder, required }
	if (placeholder) additionalProps["InputLabelProps"] = { shrink: true }

	function onBlur(event: React.FocusEvent<HTMLInputElement>) {
		data.setValue(id, event.target.value)
	}

	return (
		<Grid item {...sizes[weightSum]}>
			<TextField
				id={id}
				defaultValue={value}
				error={showError}
				onBlur={onBlur}
				onChange={() => setShowError(false)}
				{...props}
				{...additionalProps}
			/>
		</Grid>
	)
}
