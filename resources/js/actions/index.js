import { 
			INITIAL_APP_LOADING,
			PAGE_LOADING, 
			SAVE_USER_INFO,
			SAVE_ALL_TEAMS,
			SAVE_SINGLE_TEAM,
			UPDATE_TEAM_INFO,
			SAVE_ALL_PLAYERS,
			SAVE_SINGLE_PLAYER,
			UPDATE_PLAYER_INFO,
			SAVE_PLAYER_POSITIONS,
			SAVE_SCORECARDS
		} from "../constants/action-types"

export function initialAppLoading(payload) {
	return { type: INITIAL_APP_LOADING, payload }
}

export function togglePageLoad(payload) {
	return { type: PAGE_LOADING, payload }
}

export function saveUserInfo(payload) {
	return { type: SAVE_USER_INFO, payload }
}

// teams
export function saveAllTeams(payload) {
	return { type: SAVE_ALL_TEAMS , payload}
}

export function saveSingleTeam(payload) {
	return { type: SAVE_SINGLE_TEAM , payload}
}

export function updateTeamInfo(payload) {
	return { type: UPDATE_TEAM_INFO , payload}
}

// players
export function saveAllPlayers(payload) {
	return { type: SAVE_ALL_PLAYERS , payload}
}

export function saveSinglePlayer(payload) {
	return { type: SAVE_SINGLE_PLAYER , payload}
}

export function updatePlayerInfo(payload) {
	return { type: UPDATE_PLAYER_INFO , payload}
}

// positions
export function saveAllPlayerPositions(payload) {
	return { type: SAVE_PLAYER_POSITIONS , payload}
}

// scorecards
export function saveScorecards(payload) {
	return { type: SAVE_SCORECARDS , payload}
}