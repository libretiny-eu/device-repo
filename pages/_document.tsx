import Document, { Html, Head, Main, NextScript } from "next/document"
import React from "react"

export default class AppDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone&display=block"
					/>
					{(this.props as any).emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
