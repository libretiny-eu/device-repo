import { PictureType } from "../../../interface/Picture"
import { useEffectUnmount } from "../../../utils/utils"
import { FileUpload } from "../../parts/FileUpload"
import SquareImg from "../../parts/SquareImg"
import { NewPicture } from "./DeviceEditable"
import DeviceEditable from "./DeviceEditable"
import Delete from "@mui/icons-material/Delete"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	MenuItem,
	Select,
	SelectChangeEvent,
	useMediaQuery,
	useTheme,
} from "@mui/material"
import _ from "lodash"
import prettyBytes from "pretty-bytes"
import React, { Fragment, useState } from "react"

const PATH = "pictures"

const TYPES = [
	[PictureType.ProductImage, "Product image"],
	[PictureType.Packaging, "Packaging photo"],
	[PictureType.Device, "Device photo"],
	[PictureType.Manual, "Manual photo"],
	[PictureType.Pcb, "PCB"],
	[PictureType.Schematic, "Schematic"],
	[PictureType.Screenshot, "Screenshot"],
	[PictureType.Other, "Other"],
]

export default function DeviceNewPicturesPage({
	data,
}: {
	data: DeviceEditable
}) {
	const [value, error] = data.getValue<NewPicture[]>(PATH, [])
	const [invalidFiles, setInvalidFiles] = useState(0)
	const theme = useTheme()
	const screenXs = useMediaQuery(theme.breakpoints.only("xs"))
	const screenSm = useMediaQuery(theme.breakpoints.only("sm"))
	const screenMd = useMediaQuery(theme.breakpoints.only("md"))

	function updateState() {
		// set new page state; mark error for pictures without a type
		const isInvalid = _.some(value, (picture) => !picture.type)
		data.setValue(PATH, value, value.length == 0 || isInvalid)
	}

	useEffectUnmount(() => {
		// update error state on unmount - this is only for step navigation
		updateState()
	})

	function onFilesAdd(files: File[]) {
		let invalid = 0
		const pictures = files.map((file) => {
			if (!file.type?.startsWith("image/")) {
				invalid++
				return null
			}
			return {
				file: file,
				type: PictureType.None,
			}
		})
		value.push(..._.filter(pictures))
		setInvalidFiles(invalid)
		updateState()
	}

	function onFileRemove(index: number) {
		_.pullAt(value, index)
		updateState()
	}

	function onFileTypeChange(index: number, event: SelectChangeEvent) {
		value[index].type = parseInt(event.target.value)
		updateState()
	}

	const cols = screenXs ? 2 : screenSm ? 3 : screenMd ? 4 : 6

	const typeItems = _.map(TYPES, ([type, title]) => (
		<MenuItem value={type}>{title}</MenuItem>
	))

	const topBarSx = {
		background:
			"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
			"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	}

	return (
		<Fragment>
			<Dialog onClose={() => setInvalidFiles(0)} open={invalidFiles > 0}>
				<DialogTitle>Unsupported files</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{invalidFiles} file(s) were discarded because they have
						an unsupported format, or are not graphical files.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setInvalidFiles(0)} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>

			<FileUpload
				accept={["image/jpeg", "image/png"]}
				onFilesAdd={onFilesAdd}
			/>

			<ImageList cols={cols}>
				{value.map(({ file, type }, index) => {
					const removeButton = (
						<IconButton
							sx={{ color: "white" }}
							onClick={onFileRemove.bind(null, index)}
						>
							<Delete />
						</IconButton>
					)

					const typeSelect = (
						<FormControl variant="standard" sx={{ width: "100%" }}>
							<Select
								value={type}
								onChange={onFileTypeChange.bind(null, index)}
								placeholder="Select a type..."
								error={error && type == PictureType.None}
							>
								<MenuItem value={0}>
									<em>Select a type...</em>
								</MenuItem>
								{typeItems}
							</Select>
						</FormControl>
					)

					return (
						<ImageListItem key={file.name}>
							<SquareImg src={URL.createObjectURL(file)} />
							<ImageListItemBar
								title={prettyBytes(file.size, { binary: true })}
								actionIcon={removeButton}
								actionPosition="right"
								position="top"
								sx={topBarSx}
							/>
							<ImageListItemBar
								sx={{ pl: 1, pr: 1 }}
								title={typeSelect}
								position="below"
							/>
						</ImageListItem>
					)
				})}
			</ImageList>
		</Fragment>
	)
}
