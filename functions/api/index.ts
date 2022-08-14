import { text } from "../../utils/response"
import { faker } from "@faker-js/faker"

export async function onRequest() {
	return text(faker.hacker.phrase())
}
