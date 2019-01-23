import { SAVE_USER_INFO } from "../constants/action-types"

export function saveUserInfo(payload) {
	return { type: SAVE_USER_INFO, payload }
}