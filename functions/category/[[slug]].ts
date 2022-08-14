export const onRequest: PagesFunction = async ({ env, request }) => {
	return env.ASSETS.fetch(
		new URL("/category/[...slug]", request.url).toString(),
		request
	)
}
