import { Metadata } from "./Metadata"

export enum FileProvider {
	Invalid = "",
	DirectUrl = "direct_url",
	Worker = "worker",
	GoogleDrive = "google_drive",
}

export type FileBase = {
	fileId: string
	provider: FileProvider
	providerParams: any
}

export type File = FileBase & {
	meta: Metadata
	fileSize: number
}
