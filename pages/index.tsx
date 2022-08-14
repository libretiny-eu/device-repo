import { useCore } from "../components/AppCore"
import { Button } from "@mui/material"
import React from "react"

export default function Index() {
	const core = useCore()
	if (!core) return <p>Loading</p>

	return (
		<div>
			<Button variant="contained">Hello world</Button>
			<p>{core.motd}</p>
		</div>
	)
}
