
import { types } from './../types/types';

export const authReducer = (state={}, action) => {

    switch(action.type) {
        case types.LOGIN:
            return {
                ...state,
                user: action.user,
                logged:true
            }
        case types.LOGOUT:
            return {
                ...state,
                user: action.user,
                logged: false
            }
        default:
            return state
    }


}