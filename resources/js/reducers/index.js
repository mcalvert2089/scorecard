import { IS_AUTHENTICATED } from "../constants/action-types"

const initialState = {
  is_authenticated: false
};

function rootReducer(state = initialState, action) {
	if (action.type === IS_AUTHENTICATED) {
		return Object.assign({}, state, {
	    	is_authenticated: action.payload
	    })
	}
 	return state;
};

export default rootReducer;