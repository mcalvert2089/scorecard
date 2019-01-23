import { 
		SAVE_USER_INFO,
		IS_AUTHENTICATED
	} from "../constants/action-types"

const initialState = {
	user: [],
	is_authenticated: false
}

function rootReducer(state = initialState, action) {
	if (action.type === SAVE_USER_INFO) {
		return Object.assign({}, state, {
	    	user: action.payload.user
	    })
	}

	if (action.type === IS_AUTHENTICATED) {
		return Object.assign({}, state, {
	    	is_authenticated: action.payload
	    })
	}
 	return state;
};

export default rootReducer;