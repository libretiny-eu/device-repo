import Category, { CategoryAPI, CategoryIndex } from "../interface/Category"
import { getCategoryIndex } from "../utils/category"
import { IDBPDatabase, openDB } from "idb"
import _ from "lodash"
import React, { useContext, useState } from "react"
import useSWR from "swr"

export class AppCore {
	isLoading: boolean
	isLoaded: boolean
	db: IDBPDatabase

	categories: CategoryIndex
	motd: string

	constructor() {
		console.log("Core created")
	}

	async init(): Promise<boolean> {
		if (this.isLoading) return this.isLoaded
		this.isLoading = true
		// initialize database
		try {
			this.db = await openDB("device-repo", 2, {
				upgrade: (db, oldVersion, newVersion) => {
					try {
						db.createObjectStore("device", { keyPath: "slug" })
						db.createObjectStore("cache")
					} catch {}
				},
			})
		} catch {}
		this.isLoaded = true
		return true
	}

	setCategories(categories: CategoryAPI[]) {
		if (this.categories) return
		this.categories = getCategoryIndex(categories, [], [])
	}

	getCategory(slugPath: string[]): Category {
		if (!this.categories) return null
		if (slugPath.length == 0) return null
		slugPath = new Array(...slugPath)

		let index = this.categories
		while (slugPath.length > 1) {
			index = index[slugPath.shift()].subCategories
		}
		return index[slugPath[0]]
	}
}

export const AppContext = React.createContext<AppCore>(new AppCore())

export function useCore() {
	const core = useContext(AppContext)
	const [isLoaded, setIsLoaded] = useState(core.isLoaded)

	const { data: categories } = useSWR<CategoryAPI[]>("/categories")
	// const { data: motd } = useSWR<string>("/", textFetcher)

	if (!isLoaded) {
		core.init().then((isLoaded) => {
			if (isLoaded) setIsLoaded(true)
		})
		return null
	}

	if (!_.every([categories])) return core

	core.setCategories(categories)
	core.motd = "TEST motd"

	return core
}
