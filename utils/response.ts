export function json(data: any) {
	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			Vary: "Origin",
		},
	})
}

export function text(data: string) {
	return new Response(data, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			Vary: "Origin",
		},
	})
}
