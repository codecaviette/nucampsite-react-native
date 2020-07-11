// comments reducer

import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        
        case ActionTypes.ADD_COMMENT: 
            const id = state.comments.length;
            const newComment = { ... action.payload, id };
            return {...state, comments: [...state.comments, action.payload] }       // Create new array by setting comments to be everything cvurrently in state.comments plus new action.payload
                                                                                    // could instead use concat and say comments: state.comments.concat(action.payload)
        default:
            return state;
    }
};