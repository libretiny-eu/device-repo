import { Device } from "../interface/Device"

export function generateTitle(
	device: Pick<Device, "manufacturer" | "name" | "model">
) {
	return `${device.manufacturer} ${device.name} (${device.model})`
}
