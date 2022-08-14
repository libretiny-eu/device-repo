import { CategoryAPI } from "../../interface/Category"
import { json } from "../../utils/response"

export const onRequest: PagesFunction<{ INDEX: KVNamespace }> = async ({
	env,
}) => {
	const data = await env.INDEX.get<CategoryAPI[]>("categories", "json")
	return json(data || [])
}
