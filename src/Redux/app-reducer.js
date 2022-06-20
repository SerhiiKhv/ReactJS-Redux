import {authMe} from "./authMe-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type){
        case INITIALIZED_SUCCESS:
           return{
               ...state,
               initialized: true
           }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializedApp= () => {
    return (dispatch) => {
        let promise = dispatch(authMe());
        Promise.all([promise]).then( () => {
            dispatch(initializedSuccess());
        })
    }
}
