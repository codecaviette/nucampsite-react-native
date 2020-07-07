// campsites reducer

import * as ActionTypes from './ActionTypes';               // Imports all ActionTypes

// Exports campsites reducer which takes the campsites section of the state and initializes it with the default fxn param syntax if it hasn't already been 
// initiliazed. then, it takes the action that was dispatched to it and depending on what that action is, it creates and returns a new state. or, if none of 
// the actions match, then it returns previous state unchanged 
export const campsites = (state = { isLoading: true,        
                                     errMess: null,
                                     campsites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};