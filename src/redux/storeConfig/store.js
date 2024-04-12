// ** Redux, Thunk & Root Reducer Imports
import rootReducer from '../reducers/rootReducer'
import { configureStore } from "@reduxjs/toolkit";

// ** Create store
const store = configureStore({ reducer: rootReducer });

export default store;