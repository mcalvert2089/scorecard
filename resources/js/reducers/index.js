import { 
		SAVE_USER_INFO,
		SAVE_ALL_TEAMS,
		SAVE_SINGLE_TEAM,
		UPDATE_TEAM_INFO
	} from "../constants/action-types"

const initialState = {
	user: [],
	teams: [],
	players: []
}

function rootReducer(state = initialState, action) {
	if (action.type === SAVE_USER_INFO) { return Object.assign({}, state, { user: action.payload.user }) }
	if (action.type === SAVE_ALL_TEAMS) { return Object.assign({}, state, { teams: action.payload.teams }) }
	if (action.type === SAVE_SINGLE_TEAM) { 
		let index = state.teams.findIndex(row => row.id === action.payload.team.id)
		let teamState = []

		if(index === -1) {
			let teamState = state.teams.slice()
			teamState.splice(0, 0, action.payload.team)
		} else {
			teamState = state.teams.map((item, index) => {
			    if (item.id !== action.payload.team.id) {
			      return item
			    }

			    return {
			      ...item,
			      ...action.item
			    }
			})
		}

		return Object.assign({}, state, { teams: teamState })
	}

 	return state;
};

export default rootReducer;