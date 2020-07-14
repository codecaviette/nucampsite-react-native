//favorites reducer

import * as ActionTypes from './ActionTypes';               // Import all action types

export const favorites = (state = [], action) => {          // state is initialized to an empty array if it doesn't exist yet
    switch (action.type) {                                  // Switch statement checks for action type
        case ActionTypes.ADD_FAVORITE:
            if (state.includes(action.payload)) {           // Use the includes array method so that if the state already includes that specific action.payload, it 
                return state;                               // will simply return the current state. The includes method takes a single argument, action.payload, and checks to see if it matches anything already in the array
            }
            return state.concat(action.payload);            // The concat array method makes copy of the original array and adds a new item to the end of it and returns a new array without modifying the original array
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(favorite => favorite !== action.payload);
        default:
            return state;
    }
};