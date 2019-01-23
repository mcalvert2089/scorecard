import { 
		SAVE_USER_INFO
	} from "../constants/action-types"

const initialState = {
	user: []
}

function rootReducer(state = initialState, action) {
	if (action.type === SAVE_USER_INFO) {
		return Object.assign({}, state, { user: action.payload.user })
	}
 	return state;
};

export default rootReducer;