//import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


// State
const initialState = {
    profile: null,
    profiles: [],
    reops: [],
    loading: true,
    error: {}
}


export default function(state = initialState, action){
    const { type, payload } = action;
    
    
    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
            
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
        
}
    
}