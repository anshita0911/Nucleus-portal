
import { configureStore, createSlice, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension";
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
// const applyMiddleware=redux.applyMiddleware;

const toggleSlice = createSlice({
    name: 'login_register_toggle',
    initialState: { want_to_login: true,rsvp:false },
    reducers: {
        login(state) {
            // islogin:!state.islogin
            state.want_to_login = true;
        },
        register(state) {
            state.want_to_login = false;
        },
        rsvp(state){
            state.rsvp=!state.rsvp;
        },
    }
});


const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const userLoginSlice = createSlice({
    name: 'login_red',
    initialState: {
        userLogin: {
            userInfo: userInfoFromStorage,
             loading: false,
            error: ""
        },

    },
    reducers: {
        USER_LOGIN_REQUEST(state, action) {
            state.userLogin.loading = true;
        },
        USER_LOGIN_SUCCESS(state, action) {
            state.userLogin.loading = false;
            state.userLogin.userInfo = action.payload;  // imp line userInfo is inside userLogin 
        },
        USER_LOGIN_FAIL(state, action) {
            state.userLogin.loading = false;
            state.userLogin.error = action.payload;
        },
        USER_LOGOUT(state, action) {
        },
       
    }
})

const userRegisterSlice = createSlice({
    name: 'register_red',
    initialState: {
        userRegister: {
            userInfo: userInfoFromStorage,
            loading: false,
            error: ""
        },
    },
    reducers: {
        USER_REGISTER_REQUEST(state, action) {
            state.userRegister.loading = true;
        },
        USER_REGISTER_SUCCESS(state, action) {
            state.userRegister.loading = false;
            state.userRegister.userInfo = action.payload;  // imp line userInfo is inside userLogin 
        },
        USER_REGISTER_FAIL(state, action) {
            state.userRegister.loading = false;
            state.userRegister.error = action.payload;
        },

    }
})


const eventSlice = createSlice({
    name: 'event_red',
    initialState: {
        userEvent: {
            userInfo: userInfoFromStorage,
            loading: false,
            error: "",
            success: false,
        },
        events: [],
    },
    reducers: {
        EVENT_LIST_REQUEST(state, action) {
            state.userEvent.loading = true;
        },
        EVENT_LIST_SUCCESS(state, action) {
            state.userEvent.loading = false;
            state.events = action.payload;  
        },
        EVENT_LIST_FAIL(state, action) {
            state.userEvent.loading = false;
            state.userEvent.error = action.payload;
        },

        // Create Request
        EVENT_CREATE_REQUEST(state, action) {
            state.userEvent.loading = true;
        },

        EVENT_CREATE_SUCCESS(state, action) {
            state.userEvent.loading = false;
            state.userEvent.success = true;
        },

        EVENT_CREATE_FAIL(state, action) {
            state.userEvent.loading = false;
            state.userEvent.error = action.payload;
            state.userEvent.success = false;
        },
        // Delete Request
        EVENT_DELETE_REQUEST(state, action) {
            state.userEvent.loading = true;
        },

        EVENT_DELETE_SUCCESS(state, action) {
            state.userEvent.loading = false;
            state.userEvent.success = true;
        },

        EVENT_DELETE_FAIL(state, action) {
            state.userEvent.loading = false;
            state.userEvent.error = action.payload;
            state.userEvent.success = false;
        },
        // Event Update Request
        EVENT_UPDATE_REQUEST(state, action) {
            state.userEvent.loading = true;
        },

        EVENT_UPDATE_SUCCESS(state, action) {
            state.userEvent.loading = false;
            state.userEvent.success = true;
        },

        EVENT_UPDATE_FAIL(state, action) {
            state.userEvent.loading = false;
            state.userEvent.error = action.payload;
            state.userEvent.success = false;
        }

    }
})


const store = configureStore({
    reducer: {
        toggle: toggleSlice.reducer,
        login: userLoginSlice.reducer,
        register: userRegisterSlice.reducer,
        event: eventSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
    // do not forget this
    devTools: process.env.NODE_ENV !== 'production',
});

export const toggleActions = toggleSlice.actions;
export const loginActions = userLoginSlice.actions;
export const registerActions = userRegisterSlice.actions;
export const eventActions = eventSlice.actions;
export default store;