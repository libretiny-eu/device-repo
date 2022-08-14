import Layout from "../components/layout/Layout"
import createEmotionCache from "../utils/emotionCache"
import swrConfig from "../utils/swr"
import { CacheProvider, EmotionCache } from "@emotion/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { SWRConfig } from "swr"

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

export default class MyApp extends React.Component<MyAppProps> {
	render() {
		const {
			Component,
			emotionCache = clientSideEmotionCache,
			pageProps,
		} = this.props

		return (
			<SWRConfig value={swrConfig}>
				<CacheProvider value={emotionCache}>
					<Head>
						<meta
							name="viewport"
							content="initial-scale=1, width=device-width"
						/>
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CacheProvider>
			</SWRConfig>
		)
	}
}
