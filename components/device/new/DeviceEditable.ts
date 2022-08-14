import Category from "../../../interface/Category"
import { Device } from "../../../interface/Device"
import { PictureType } from "../../../interface/Picture"
import Editable from "../../../utils/Editable"

export type NewPicture = {
	file: File
	type: PictureType
}

export type DeviceUI = Omit<Device, "categories"> & {
	categories: Category[]
	pictures: NewPicture[]
}

type DeviceEditable = Editable<DeviceUI>

export default DeviceEditable
