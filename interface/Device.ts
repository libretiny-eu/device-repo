import { ConfigBase } from "./Config"
import { FileBase } from "./File"
import { defaultMetadata, Metadata } from "./Metadata"
import { Picture } from "./Picture"

// used in category indexes
export type DeviceBase = {
	slug: string // URL-friendly slug
	title: string // displayed title (manufacturer + name + model?)
	thumbnail?: FileBase // thumbnail File
}

// used in device indexes
export type DeviceDetails = DeviceBase & {
	manufacturer?: string // manufacturer/vendor
	name: string // device name (can be same as category)
	model?: string // model number
	version?: string // device version/edition (numeric, or custom)
	categories: string[] // category slug paths
}

// complete device data object
export type Device = DeviceDetails & {
	meta: Metadata
	description: string[]
	pictures: Picture[]

	url: {
		product: string[]
		store: string[]
	}

	hardware: {
		chip: string // MCU name
		board: {
			name?: string // board name, or custom (unknown)
			code?: string // LT board code
		}
		markings: {
			board: string[] // silkscreen of IoT board
			pcb: string[] // silkscreen of device PCB
		}
	}

	gpio: {
		[key: number]: {}
	}

	// various user-added configs
	configs: ConfigBase[]
}

export function defaultDevice(): Device {
	return {
		// DeviceBase
		slug: "_device-draft",
		title: "",
		name: "",
		// DeviceDetails
		categories: [],
		// Device
		meta: defaultMetadata(),
		description: [],
		pictures: [],
		url: {
			product: [],
			store: [],
		},
		hardware: {
			chip: "",
			board: {},
			markings: {
				board: [],
				pcb: [],
			},
		},
		gpio: {},
		configs: [],
	}
}
