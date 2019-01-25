import { 
			SAVE_USER_INFO,
			SAVE_ALL_TEAMS,
			SAVE_SINGLE_TEAM,
			UPDATE_TEAM_INFO
		} from "../constants/action-types"

export function saveUserInfo(payload) {
	return { type: SAVE_USER_INFO, payload }
}

export function saveAllTeams(payload) {
	return { type: SAVE_ALL_TEAMS , payload}
}

export function saveSingleTeam(payload) {
	return { type: SAVE_SINGLE_TEAM , payload}
}

export function updateTeamInfo(payload) {
	return { type: UPDATE_TEAM_INFO , payload}
}