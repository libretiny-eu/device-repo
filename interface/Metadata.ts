export enum VerificationState {
	None = "none",
	AuthorVerified = "author",
	DeveloperVerified = "developer",
	CommunityVerified = "community",
}

export type Metadata = {
	addedBy: string
	addedAt: number
	verification: VerificationState
}

export function defaultMetadata(): Metadata {
	return {
		addedBy: "",
		addedAt: 0,
		verification: VerificationState.None,
	}
}
