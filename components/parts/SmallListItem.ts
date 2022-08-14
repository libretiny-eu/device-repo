import { ListItem, styled } from "@mui/material"

const SmallListItem = styled(ListItem)({
	"& .MuiListItemButton-root": {
		minHeight: 32,
		paddingLeft: 24,
		paddingRight: 24,
	},
	"& .MuiListItemIcon-root": {
		minWidth: 0,
		marginRight: 16,
	},
	"& .MuiSvgIcon-root": {
		fontSize: 20,
	},
	"& .MuiListItemText-root": {
		fontSize: 14,
	},
})

export default SmallListItem
