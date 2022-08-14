import Category from "../../interface/Category"
import NextLink from "../parts/NextLink"
import NavigateNext from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs } from "@mui/material"
import React, { ElementType } from "react"

export default function CategoryPath({
	component,
	category,
	onClick,
	children,
}: React.PropsWithChildren<{
	component?: ElementType
	category: Category
	onClick?: (category: Category) => void
}>) {
	const path = category?.categoryPath ?? []

	return (
		<Breadcrumbs separator={<NavigateNext fontSize="small" />}>
			{path.map((category, index) => (
				<Box
					component={component ?? "p"}
					key={category.slugPath.join("/") + "-breadcrumb"}
				>
					<NextLink
						href={
							onClick
								? "#!"
								: "/category/" + category.slugPath.join("/")
						}
						onClick={onClick?.bind(null, category)}
						underline="hover"
						color={
							index == path.length - 1
								? "text.primary"
								: "inherit"
						}
					>
						{category.title}
					</NextLink>
				</Box>
			))}
			{children}
		</Breadcrumbs>
	)
}
