import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { gallery } from "./gallery/reducer";

export const reducers = combineReducers({ gallery });

export type RootState = ReturnType<typeof reducers>;
export const store = createStore(reducers, applyMiddleware(thunk, logger));
