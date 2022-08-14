import { defaultDevice, Device } from "../../../interface/Device"
import Editable from "../../../utils/Editable"
import { AppCore, useCore } from "../../AppCore"
import DeviceEditable, { DeviceUI } from "../../device/new/DeviceEditable"
import ResponsiveStepper from "../../parts/ResponsiveStepper"
import SkeletonPage from "../../parts/skeleton/SkeletonPage"
import DeviceNewInfoPage from "./DeviceNewInfoPage"
import DeviceNewPicturesPage from "./DeviceNewPicturesPage"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import _ from "lodash"
import React, { useEffect, useState } from "react"

const STEP_DATA = [
	{
		label: "Basic info",
		paths: ["name", "meta.addedBy", "categories", "description"],
	},
	{
		label: "Pictures",
		paths: ["pictures"],
	},
	{
		label: "Hardware",
		paths: [],
	},
	{
		label: "Configurations",
		paths: [],
	},
]

function dataDeserialize(core: AppCore, device: Device): DeviceUI {
	if (!device) return null
	const result: DeviceUI = device as unknown as DeviceUI
	result.categories = device.categories.map((slugPath) =>
		core.getCategory(slugPath.split("/"))
	)
	result.pictures = []
	return result
}

function dataSerialize(device: DeviceUI): Device {
	if (!device) return null
	const result: Device = device as unknown as Device
	result.categories = _.filter(device.categories).map((category) =>
		category.slugPath.join("/")
	)
	result["pictures"] = []
	return result
}

export default function NewDevicePage() {
	const core = useCore()
	const [stepCurrent, setStepCurrent] = useState(0)
	const [stepMax, setStepMax] = useState<number>(-1)

	// ugly hack to allow force-rendering with the same Editable object
	const [_dummy, forceRender] = useState(null)
	const [data, _setData] = useState<DeviceEditable>(new Editable(forceRender))

	// save/restore device draft
	useEffect(() => {
		const promise: Promise<Device> = core?.db?.get(
			"device",
			"_device-draft"
		)
		promise?.then((device) => {
			console.log("Loaded device", device)
			const deviceEditable = dataDeserialize(
				core,
				device ?? defaultDevice()
			)
			data.setData(deviceEditable)
			data.forceRender()
		})

		return () => {
			// skip saving uninitialized data
			const device = dataSerialize(data.data)
			if (!device) return
			console.log("Unmounting with", device)
			core?.db?.put("device", device)
			console.log("Saved", device)
		}
	}, [core])

	// make sure device and categories are fetched from DB and API
	if (!data.data) return <SkeletonPage />

	function getStepLayout(index: number) {
		switch (index) {
			case 0:
				return <DeviceNewInfoPage data={data} />
			case 1:
				return <DeviceNewPicturesPage data={data} />
		}
	}

	function onStepClick(index: number) {
		setStepMax(Math.max(index - 1, stepMax))
		setStepCurrent(index)
	}

	const steps = _.map(STEP_DATA, (step, index) => ({
		label: step.label,
		completed: stepCurrent > index && !data.hasErrors(...step.paths),
		error: stepCurrent > index && data.hasErrors(...step.paths),
	}))
	const notFirst = stepCurrent > 0
	const notLast = stepCurrent < steps.length - 1

	console.log("Rendering stepCurrent =", stepCurrent)

	return (
		<Box sx={{ width: "100%" }}>
			<h1>Create a new device</h1>

			<ResponsiveStepper
				steps={steps}
				current={stepCurrent}
				onClick={onStepClick}
			/>

			<Box
				component="form"
				noValidate
				sx={{
					"& .MuiTextField-root": {
						width: "100%",
					},
				}}
			>
				{getStepLayout(stepCurrent)}
			</Box>

			<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
				{notFirst && (
					<Button
						variant="outlined"
						onClick={onStepClick.bind(null, stepCurrent - 1)}
					>
						Back
					</Button>
				)}
				<Box sx={{ flex: "1 1 auto" }} />
				{notLast && (
					<Button
						variant="outlined"
						onClick={onStepClick.bind(null, stepCurrent + 1)}
					>
						Next
					</Button>
				)}
			</Box>
		</Box>
	)
}
