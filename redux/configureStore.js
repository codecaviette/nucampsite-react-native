// This file creates the store that holds state

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';                // import all 4 reducers
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites,
            comments,
            partners,
            promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}