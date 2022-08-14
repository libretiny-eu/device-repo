import Category from "../../interface/Category"
import { getCurrentSlugPath, isChildCategory } from "../../utils/category"
import SmallListItem from "../parts/SmallListItem"
import CategoryListDrawer from "./CategoryDrawerList"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import {
	Badge,
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"
import _ from "lodash"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Fragment } from "react"

export default function CategoryDrawerItem({
	category,
	dense,
}: {
	category: Category
	dense?: boolean
}) {
	const router = useRouter()

	const slugFull = category.slugPath.join("/")
	const indent = category.slugPath.length - 1
	const hasSubCategories = !_.isEmpty(category.subCategories)
	const isActive = _.isEqual(category.slugPath, getCurrentSlugPath(router))
	const isOpen =
		isActive ||
		isChildCategory(category.slugPath, getCurrentSlugPath(router))

	const openIcon = isOpen ? <ExpandLess /> : <ExpandMore />
	const devicesBadge = (
		<Badge
			badgeContent={category.devices.length}
			color="primary"
			showZero
		/>
	)

	const button = (
		<Link href={`/category/${slugFull}`}>
			<ListItemButton selected={isActive}>
				<ListItemIcon sx={{ ml: indent }}>
					<Icon>{category.icon}</Icon>
				</ListItemIcon>
				<ListItemText primary={category.title} />
				{hasSubCategories && openIcon}
				{!hasSubCategories && devicesBadge}
			</ListItemButton>
		</Link>
	)

	return (
		<Fragment>
			{dense ? (
				<SmallListItem key={`${slugFull}-item`} disablePadding>
					{hasSubCategories && button}
					{!hasSubCategories && button}
				</SmallListItem>
			) : (
				<ListItem key={`${slugFull}-item`} disablePadding>
					{hasSubCategories && button}
					{!hasSubCategories && button}
				</ListItem>
			)}

			{hasSubCategories && (
				<Collapse
					key={`${slugFull}-collapse`}
					in={isOpen}
					timeout="auto"
					unmountOnExit
				>
					<List dense={dense} disablePadding>
						<CategoryListDrawer
							categories={category.subCategories}
							dense={dense}
						/>
					</List>
				</Collapse>
			)}
		</Fragment>
	)
}
