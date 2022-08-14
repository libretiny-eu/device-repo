import AppTheme from "./AppTheme"
import MainBar from "./MainBar"
import MainDrawer from "./MainDrawer"
import { AppBar, Box, Toolbar } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"

const drawerWidth = 320

export type LayoutState = {
	isMenuOpen: boolean
}

export default class Layout extends React.Component<unknown, LayoutState> {
	constructor(props: unknown) {
		super(props)
		this.state = {
			isMenuOpen: false,
		}
	}

	menuToggle() {
		this.setState({
			isMenuOpen: !this.state.isMenuOpen,
		})
	}

	render() {
		return (
			<AppTheme>
				<Box sx={{ display: "flex" }}>
					<AppBar
						position="fixed"
						sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
					>
						<MainBar onMenuClick={this.menuToggle.bind(this)} />
					</AppBar>
					<Box
						component="nav"
						sx={{
							width: { md: drawerWidth },
							flexShrink: { md: 0 },
						}}
					>
						<MainDrawer
							drawerWidth={drawerWidth}
							isMobile={true}
							isOpen={this.state.isMenuOpen}
							onClose={this.menuToggle.bind(this)}
						/>
						<MainDrawer
							drawerWidth={drawerWidth}
							isMobile={false}
						/>
					</Box>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							width: { md: `calc(100% - ${drawerWidth}px)` },
						}}
					>
						<Toolbar />
						<Container sx={{ p: 4, pt: 1 }}>
							{this.props.children}
						</Container>
					</Box>
				</Box>
			</AppTheme>
		)
	}
}
