import { File } from "./File"

export enum PictureType {
	None = "",
	ProductImage = "product_image",
	Packaging = "packaging",
	Device = "device",
	Manual = "manual",
	Pcb = "pcb",
	Schematic = "schematic",
	Screenshot = "screenshot",
	Other = "other",
}

export type Picture = File & {
	type: PictureType
	dimensions: [width: number, height: number]
}
