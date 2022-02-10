import countryReducer from "../slices/countrySlice";
import weatherReducer from "../slices/weatherSlice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunkMiddleware  from "redux-thunk";

// Combine reducers and combine them into a single reducer.
const reducer = combineReducers({
    countries: countryReducer,
    weather: weatherReducer,
    
})

// Configures the store for the reducer.
const Store = configureStore({
    reducer: reducer,
    middleware: [thunkMiddleware],
});

export default Store;


