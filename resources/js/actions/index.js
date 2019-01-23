import { SAVE_USER_INFO, IS_AUTHENTICATED } from "../constants/action-types"

export function saveUserInfo(payload) {
	return { type: SAVE_USER_INFO, payload }
}

export function isAuthenticated(payload) {
  return { type: IS_AUTHENTICATED, payload }
}