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
import { createReducer } from 'redux-starter-kit'

const initialState = {
	initialAppLoading: true,
	pageLoading: true,
	user: [],
	teams: [],
	players: [],
	positions: [],
	scorecards: []
}

function rootReducer(state = initialState, action) {
	if (action.type === INITIAL_APP_LOADING) { return Object.assign({}, state, { initialAppLoading: action.payload.app_loading }) }
	if (action.type === PAGE_LOADING) { return Object.assign({}, state, { pageLoading: action.payload.pageLoading }) }
	if (action.type === SAVE_USER_INFO) { return Object.assign({}, state, { user: action.payload.user }) }
	
	// teams
	if (action.type === SAVE_ALL_TEAMS) { return Object.assign({}, state, { teams: action.payload.teams }) }
	if (action.type === SAVE_SINGLE_TEAM) { 
		let teamState = []
		let index = state.teams.findIndex(row => row.id === action.payload.team.id)

		if(index === -1) {
			teamState = state.teams.slice()
			teamState.splice(0, 0, action.payload.team)
		} else {
			teamState = state.teams.map((item, index) => {
			    if (item.id !== action.payload.team.id) { return item }
			    return { ...item, ...action.payload.team }
			})
		}
		return Object.assign({}, state, { teams: teamState })
	}

	// players
	if (action.type === SAVE_ALL_PLAYERS) { return Object.assign({}, state, { players: action.payload.players }) }
	if (action.type === SAVE_SINGLE_PLAYER) { 
		let playerState = []
		let index = state.players.findIndex(row => row.id === action.payload.player.id)
		if(index === -1) {
			playerState = state.players.slice()
			playerState.splice(0, 0, action.payload.player)
		} else {
			playerState = state.players.map((item, index) => {
			    if (item.id !== action.payload.player.id) { return item }
			    return { ...item, ...action.payload.player }
			})
		}
		return Object.assign({}, state, { players: playerState })
	}

	if (action.type === SAVE_PLAYER_POSITIONS) { return Object.assign({}, state, { positions: action.payload.positions }) }
	if (action.type === SAVE_SCORECARDS) {  return Object.assign({}, state, { scorecards: action.payload.scorecards }) }

 	return state
}

export default rootReducer
