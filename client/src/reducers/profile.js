import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_REPOS, GET_PROFILES, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
}

export const profile = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profil:null
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
};

