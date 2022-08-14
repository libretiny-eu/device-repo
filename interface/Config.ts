import { Metadata } from "./Metadata"

export type Mapping = {
	[key: string]: string | number | boolean
}

export enum ConfigType {
	Custom = "custom",
	EspHome = "esphome",
	Cloudcutter = "cloudcutter",
}

export type ConfigBase = {
	title: string
	description: string[]
	meta: Metadata
	type: ConfigType
	[key: string]: any
}

export type ESPHomeConfig = ConfigBase & {
	platformioOptions: Mapping
	ltConfig: Mapping
	components: {
		[key: string]: object | object[]
	}
}

export type CloudcutterConfig = ConfigBase & {
	profileName: string
	issueId?: number
	pullId?: number
	commitId?: string
}
