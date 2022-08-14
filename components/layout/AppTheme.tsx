import NextLink from "../parts/NextLink"
import { CssBaseline, useMediaQuery } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react"

export default function AppTheme({ children }: React.PropsWithChildren<{}>) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

	const theme = createTheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
		},
		components: {
			MuiIcon: {
				defaultProps: {
					baseClassName: "material-icons-two-tone",
				},
				styleOverrides: {
					root: prefersDarkMode && {
						color: "black",
						filter: "invert()",
					},
				},
			},
			MuiButtonBase: {
				defaultProps: {
					LinkComponent: NextLink,
				},
			},
			MuiAlert: {
				styleOverrides: prefersDarkMode && {
					standardSuccess: { backgroundColor: "#183E1D" },
					standardInfo: { backgroundColor: "#003E59" },
					standardWarning: { backgroundColor: "#5A3400" },
					standardError: { backgroundColor: "#571B1B" },
				},
			},
		},
	})

	const themeMemo = React.useMemo(() => theme, [theme])

	return (
		<ThemeProvider theme={themeMemo}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
