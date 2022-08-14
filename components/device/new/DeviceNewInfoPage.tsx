import { generateTitle } from "../../../utils/device"
import CategorySelector from "../../category/CategorySelector"
import DescriptionEditor from "../../parts/DescriptionEditor"
import TextFieldWrapper from "../../parts/TextFieldWrapper"
import DeviceEditable from "./DeviceEditable"
import { Divider, Grid } from "@mui/material"
import _ from "lodash"
import React, { Fragment } from "react"

export default function DeviceNewInfoPage({ data }: { data: DeviceEditable }) {
	const divider = (
		<Grid item xs={12}>
			<Divider sx={{ mb: 1 }} />
		</Grid>
	)

	return (
		<Fragment>
			<Grid container spacing={2}>
				<TextFieldWrapper
					data={data}
					id="title"
					label="Title"
					helperText="Leave empty to generate automatically"
					placeholder={generateTitle(data.data)}
					weightSum={2}
				/>
				<TextFieldWrapper
					data={data}
					id="meta.addedBy"
					label="Your Name"
					required
					weightSum={2}
				/>

				{divider}

				<TextFieldWrapper
					data={data}
					id="manufacturer"
					label="Manufacturer"
					helperText="Device manufacturer/vendor"
					weightSum={3}
				/>
				<TextFieldWrapper
					data={data}
					id="name"
					label="Name"
					helperText="Found on the packaging or the device itself"
					required
					weightSum={3}
				/>
				<TextFieldWrapper
					data={data}
					id="model"
					label="Model Number"
					helperText="Model number or other symbol"
					weightSum={3}
				/>
				<TextFieldWrapper
					data={data}
					id="version"
					label="Version"
					helperText="Device version/edition (i.e. to differentiate from other chip versions)"
				/>
			</Grid>

			<Divider sx={{ mt: 2 }} />

			<h2>Categories</h2>
			<p>Select one or few categories this device fits in.</p>

			<CategorySelector data={data} />

			<h2>Description</h2>
			<p>
				Describe this device briefly; you can add any
				notes/warnings/caveats using the Add button on the left.
			</p>

			<DescriptionEditor data={data} path="description" required />
		</Fragment>
	)
}
