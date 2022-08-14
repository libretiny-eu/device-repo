import { getCurrentSlugPath } from "../../utils/category"
import { useCore } from "../AppCore"
import SkeletonPage from "../parts/skeleton/SkeletonPage"
import CategoryPath from "./CategoryPath"
import Error from "next/error"
import { useRouter } from "next/router"
import React from "react"

export default function CategoryPage() {
	const core = useCore()
	const router = useRouter()

	if (!core) return <SkeletonPage />

	const category = core.getCategory(getCurrentSlugPath(router))
	if (!category) return <Error statusCode={404} />

	return <CategoryPath component="h1" category={category} />
}
