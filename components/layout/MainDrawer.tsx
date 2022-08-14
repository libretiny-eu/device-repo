import { useCore } from "../AppCore"
import CategoryDrawerList from "../category/CategoryDrawerList"
import SkeletonDrawerList from "../parts/skeleton/SkeletonDrawerList"
import Add from "@mui/icons-material/Add"
import { Button, Divider, Drawer, List, Toolbar } from "@mui/material"
import React, { Fragment } from "react"

type MainDrawerProps = {
	drawerWidth: number
	isMobile: boolean
	isOpen?: boolean
	onClose?: () => void
	window?: () => Window
}

function DrawerContent({ dense }: { dense?: boolean }) {
	const core = useCore()

	let categories: React.ReactElement
	if (core?.categories) {
		categories = (
			<CategoryDrawerList categories={core.categories} dense={dense} />
		)
	} else {
		categories = <SkeletonDrawerList dense={dense} />
	}

	return (
		<Fragment>
			<Toolbar key="appbar-padding" />
			<Toolbar key="action-toolbar">
				<Button
					variant="contained"
					startIcon={<Add />}
					href="/device/new"
				>
					Add device
				</Button>
			</Toolbar>
			<Divider key="divider" sx={{ mb: 1 }} />
			<List dense={dense} disablePadding>
				{categories}
			</List>
		</Fragment>
	)
}

export default function MainDrawer({
	window,
	drawerWidth,
	isMobile,
	isOpen,
	onClose,
}: MainDrawerProps) {
	const windowContainer =
		window !== undefined ? () => window().document.body : undefined

	let sx: object
	if (isMobile) {
		sx = {
			display: { xs: "block", md: "none" },
			"& .MuiDrawer-paper": {
				boxSizing: "border-box",
				width: drawerWidth,
			},
		}
	} else {
		sx = {
			display: { xs: "none", md: "block" },
			"& .MuiDrawer-paper": {
				boxSizing: "border-box",
				width: drawerWidth,
			},
		}
	}

	if (isMobile)
		return (
			<Drawer
				variant="temporary"
				container={windowContainer}
				ModalProps={{
					keepMounted: true,
				}}
				open={isOpen}
				onClose={onClose}
				sx={sx}
			>
				<DrawerContent />
			</Drawer>
		)
	return (
		<Drawer variant="permanent" open={true} sx={sx}>
			<DrawerContent dense />
		</Drawer>
	)
}
