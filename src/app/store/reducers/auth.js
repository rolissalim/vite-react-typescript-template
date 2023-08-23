import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from "@app/helper/localstorage.helper";
import * as moment from "moment";

const me = getItem('me')

const initialState = {
    city_id: !!me?.city_id,
    isLoggedIn: !!getItem('credentials'),
    credentials: getItem('credentials'),
    currentUser: me,
    activeMenu: getItem('activeMenu'),
    access: getItem('access'),
    role: getItem('role') || "guest",
    power: getItem('power'),
    workspace: getItem('workspace'),
    city: getItem('city'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, { payload }) => {
            setItem('credentials', payload);
            state.isLoggedIn = true;
            state.credentials = payload;
        },
        refreshToken: (state, { payload }) => {
            setItem('credentials', payload);
            state.isLoggedIn = true;
            state.credentials = payload;
        },
        setLoggedInUserDetail: (state, { payload }) => {
            setItem('me', payload);
            state.currentUser = payload;
        },

        setSessionLifetime: (_state, { payload }) => {
            setItem("accepted", { remember_me: payload.rememberMe, time: moment().valueOf() })
        },
        logoutUser: (state) => {
            localStorage.removeItem('credentials');
            localStorage.removeItem('accepted');
            localStorage.removeItem('power');
            localStorage.removeItem('me');
            localStorage.removeItem('layout');
            localStorage.removeItem('group');
            localStorage.removeItem('navigation');
            localStorage.removeItem('g-refresh');
            localStorage.removeItem('access');
            state.currentUser = {};
            state.activeMenu = {};
            state.isLoggedIn = false;
            state.credentials = null;
            state.accepted = null;
            state.power = null;
            state.navigation = null;
            state.me = null;
            localStorage.clear()
        },
        loadUser: (state, { payload }) => {
            state.currentUser = payload;
        }
    }
});

export const {
    loginUser,
    setLoggedInUserDetail,
    logoutUser,
    loadUser,
    setSessionLifetime,
    setUnitPembangkit,
    refreshToken,
    setActiveMenu,
    setRoleAccess,
    setRole,
    setWorkspace,
    setCity,
} = authSlice.actions;

export default authSlice.reducer;
