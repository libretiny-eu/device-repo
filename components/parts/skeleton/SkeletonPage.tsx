import { Typography, Skeleton } from "@mui/material"
import { Box } from "@mui/system"
import React, { Fragment } from "react"

export default function SkeletonPage() {
	return (
		<Fragment>
			<Typography variant="h1">
				<Skeleton />
			</Typography>
			<Box sx={{ width: 300 }}>
				{new Array(5).fill(0).map((x, i) => (
					<Skeleton key={i.toString()} />
				))}
			</Box>
		</Fragment>
	)
}
