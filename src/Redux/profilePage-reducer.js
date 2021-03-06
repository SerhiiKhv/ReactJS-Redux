import {ProfileAPI} from "../Api/Api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';
const GET_STATUS = 'GET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTOS_SUCCESS = 'SET_PHOTOS_SUCCESS';

let initialState = {
    posts: [
        {id: 1, text: 'Hi', like: '2'},
        {id: 2, text: 'Hello', like: '3'},
        {id: 3, text: 'Good', like: '5'}
    ],
    newPostText: '',
    profile: null,
    status: ""
}

export const profilePageReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 4,
                text: action.newPostText,
                like: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile,
            }
        case SET_PHOTOS_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case GET_STATUS:
            return {
                ...state, status: action.status,
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId),
            }

        default:
            return state;
    }
}

export const addPostActiveCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const getStatus = (status) => ({type: GET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setPhotosSuccess = (photos) => ({type: SET_PHOTOS_SUCCESS, photos})

export const getProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatusProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(getStatus(response.data));
}

export const putStatusProfile = (status) => async (dispatch) => {
    let response = await ProfileAPI.putStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatus(status));
    }
}

export const putPhotosProfile = (photosFile) => async (dispatch) => {
    let response = await ProfileAPI.putPhotos(photosFile)
    if (response.data.resultCode === 0) {
        dispatch(setPhotosSuccess(response.data.data.photos));
    }
}

export const putInfoProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().authMe.userId;
    let response = await ProfileAPI.putProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    }
}

