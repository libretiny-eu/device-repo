import CloudUpload from "@mui/icons-material/CloudUpload"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { Fragment, useState } from "react"

// based on https://codesandbox.io/s/lgqwn by @mouimet-infinisoft

export type FileUploadProps = {
	accept: string[]
	hoverLabel?: string
	dropLabel?: string
	onFilesAdd: (files: File[]) => void
}

export function FileUpload({
	accept,
	hoverLabel = "Click or drag to upload file",
	dropLabel = "Drop file here",
	onFilesAdd,
}: FileUploadProps) {
	const [dragOverCount, setDragOverCount] = useState(0)

	const stopDefaults = (e: React.DragEvent) => {
		e.stopPropagation()
		e.preventDefault()
	}

	const dragEvents = {
		onDragEnter: (e: React.DragEvent) => {
			stopDefaults(e)
			setDragOverCount(dragOverCount + 1)
		},
		onDragLeave: (e: React.DragEvent) => {
			stopDefaults(e)
			setDragOverCount(dragOverCount - 1)
		},
		onDragOver: stopDefaults,
		onDrop: (e: React.DragEvent<HTMLElement>) => {
			stopDefaults(e)
			setDragOverCount(dragOverCount - 1)
			onFilesAdd([...e.dataTransfer.files])
		},
	}

	const sx = {
		cursor: "pointer",
		textAlign: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		pt: 2,
		pb: 2,
		"& p, svg": {
			opacity: 0.4,
			"&": dragOverCount && { opacity: 1 },
		},
		"&:hover p, &:hover svg,": {
			opacity: 1,
		},
	}

	return (
		<Fragment>
			<input
				onChange={(e) => onFilesAdd([...e.target.files])}
				accept={accept.join()}
				style={{ display: "none" }}
				id="file-upload"
				multiple
				type="file"
			/>

			<Box
				component="label"
				htmlFor="file-upload"
				sx={sx}
				{...dragEvents}
			>
				<CloudUpload fontSize="large" />
				<Typography>
					{dragOverCount ? dropLabel : hoverLabel}
				</Typography>
			</Box>
		</Fragment>
	)
}
