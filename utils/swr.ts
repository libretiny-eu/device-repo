import { openDB } from "idb"
import { SWRConfiguration } from "swr"

export async function jsonFetcher(url: string, init?: RequestInit) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}api${url}`,
		init
	)
	return await response.json()
}

export async function textFetcher(url: string, init?: RequestInit) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}api${url}`,
		init
	)
	return await response.text()
}

export async function cachedFetcher(
	fetcher: (url: string, init?: RequestInit) => any,
	url: string,
	init?: RequestInit
) {
	const db = await openDB("device-repo")
	async function request() {
		const data = await fetcher(url, init)
		try {
			await db.put("cache", data, url)
		} catch {}
		return data
	}
	try {
		const data = await db.get("cache", url)
		return data ?? (await request())
	} catch {
		return await request()
	}
}

const swrConfig: SWRConfiguration = {
	fetcher: cachedFetcher.bind(null, jsonFetcher),
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
	refreshInterval: 0,
}

export default swrConfig
