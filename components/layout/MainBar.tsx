import NextLink from "../parts/NextLink"
import SearchBar from "../parts/SearchBar"
import MenuIcon from "@mui/icons-material/Menu"
import { IconButton, Toolbar, Typography } from "@mui/material"
import React from "react"

type MainBarProps = {
	onMenuClick: () => void
}

export default class MainBar extends React.Component<MainBarProps> {
	render() {
		return (
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: { sm: 2 }, display: { md: "none" } }}
					onClick={this.props.onMenuClick}
				>
					<MenuIcon />
				</IconButton>
				<NextLink href="/" underline="none" color="text.primary">
					<Typography
						variant="h6"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						LibreTuya Devices
					</Typography>
				</NextLink>
				<SearchBar />
			</Toolbar>
		)
	}
}
