import { slugify } from "../../utils/utils"
import {
	Step,
	StepButton,
	StepLabel,
	Stepper,
	useMediaQuery,
	useTheme,
} from "@mui/material"
import React from "react"

export default function ResponsiveStepper(props: {
	steps: { label: string; completed: boolean; error: boolean }[]
	current: number
	onClick: (step: number) => void
}) {
	const theme = useTheme()
	const orientation = useMediaQuery(theme.breakpoints.up("sm"))
		? "horizontal"
		: "vertical"

	return (
		<Stepper
			activeStep={props.current}
			sx={{ pb: 4 }}
			orientation={orientation}
			nonLinear
		>
			{props.steps.map((step, index) => (
				<Step key={slugify(step.label)} completed={step.completed}>
					<StepButton onClick={props.onClick.bind(null, index)}>
						<StepLabel error={step.error}>{step.label}</StepLabel>
					</StepButton>
				</Step>
			))}
		</Stepper>
	)
}
