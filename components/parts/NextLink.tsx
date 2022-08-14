// https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a
// MaterialUI v5
// Thanks to @bryantobing12
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import React from "react"

export type LinkProps = Omit<MuiLinkProps, "href" | "classes"> &
	Pick<NextLinkProps, "href" | "as" | "prefetch">

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ href, as, prefetch, ...props }, ref) => (
		<NextLink href={href} as={as} prefetch={prefetch} passHref>
			<MuiLink ref={ref} {...props} />
		</NextLink>
	)
)

export default Link
