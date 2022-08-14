import SmallListItem from "../SmallListItem"
import {
	ListItemButton,
	ListItemIcon,
	Icon,
	ListItemText,
	Skeleton,
	ListItem,
} from "@mui/material"
import React from "react"

export default function SkeletonDrawerItem({ dense }: { dense?: boolean }) {
	const button = (
		<ListItemButton>
			<ListItemIcon>
				<Skeleton variant="circular" height={24}>
					<Icon></Icon>
				</Skeleton>
			</ListItemIcon>
			<Skeleton variant="text" height={18}>
				<ListItemText primary="Lorem ipsum dolor sit amet" />
			</Skeleton>
		</ListItemButton>
	)

	return dense ? (
		<SmallListItem disablePadding>{button}</SmallListItem>
	) : (
		<ListItem disablePadding>{button}</ListItem>
	)
}
