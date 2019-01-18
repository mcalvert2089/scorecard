import { IS_AUTHENTICATED } from "../constants/action-types"

export function isAuthenticated(payload) {
  return { type: IS_AUTHENTICATED, payload }
};