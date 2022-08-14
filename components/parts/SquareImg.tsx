import { Box } from "@mui/material"
import React from "react"

export default function SquareImg(
	props: React.ImgHTMLAttributes<HTMLImageElement>
) {
	return (
		<Box
			sx={{
				position: "relative",
				"&::after": {
					content: '""',
					display: "block",
					paddingBottom: "100%",
				},
			}}
		>
			<img
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
				{...props}
			/>
		</Box>
	)
}
