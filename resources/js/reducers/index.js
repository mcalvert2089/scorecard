import { 
		SAVE_USER_INFO,
		SAVE_ALL_TEAMS,
		SAVE_SINGLE_TEAM,
		UPDATE_TEAM_INFO
	} from "../constants/action-types"
import { createReducer } from 'redux-starter-kit'

const initialState = {
	user: [],
	teams: [],
	players: []
}

function rootReducer(state = initialState, action) {
	if (action.type === SAVE_USER_INFO) { return Object.assign({}, state, { user: action.payload.user }) }
	if (action.type === SAVE_ALL_TEAMS) { return Object.assign({}, state, { teams: action.payload.teams }) }
	if (action.type === SAVE_SINGLE_TEAM) { 
		let teamState = []
		let index = state.teams.findIndex(row => row.id === action.payload.team.id)

		if(index === -1) {
			teamState = state.teams.slice()
			teamState.splice(0, 0, action.payload.team)
		} else {
			teamState = state.teams.map((item, index) => {
			    if (item.id !== action.payload.team.id) {
			      return item
			    }

			    return {
			      ...item,
			      ...action.payload.team
			    }
			})
		}
		return Object.assign({}, state, { teams: teamState })
	}

 	return state;
};

export default rootReducer;