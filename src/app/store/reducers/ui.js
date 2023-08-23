import { createSlice } from '@reduxjs/toolkit';
import { calculateWindowSize } from '@app/helper/browser.helper';
import { getItem, setItem } from "@app/helper/localstorage.helper";

const initialState = {
    application: getItem('app'),
    themeMode: getItem('themeMode') || 'light',
    subSideNavActive: undefined,
    navigation: getItem('navigation'),
    activePage: undefined,
    activePaging: 0,
    callbackForm: null,
    activeFilters: null,
    activeFilters: { filters: { filter: [{ value: 'true', field: 'is_active' }] }, count: 1 },
    loading: false,
    searchKeyword: '',
    types: [],
    isSidebarMenuCollapsed: false,
    screenSize: calculateWindowSize(window.innerWidth),
    language: "id",
    apiGoogle: getItem('apiGoogle'),
    currentPage: getItem('currentPage'),
    sidebar: getItem('sidebar') || "lg",
    jaringan: null,
    provinsi: null,
    kota_kab: null,
    kecamatan: null,
    kelurahan: null,
    type: null,
    relawan: null,
    user_types: null,
    perekrut: null,
    coordinates: null,
    dataInput: [],
    activeFiltersChart: null
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setLoadingForm: (state, { payload }) => {
            state.loadingForm = payload;
        },
        setVisibiltyModal: (state, { payload }) => {
            state.visibiltyModal = payload;
        },
        setActiveFilters: (state, { payload }) => {
            state.activeFilters = payload;
        },
        setActiveFiltersChart: (state, { payload }) => {
            state.activeFiltersChart = payload;
        },
        setActivePaging: (state, { payload }) => {
            state.activePaging = payload;
        },
        setCallbackForm: (state, { payload }) => {
            state.callbackForm = payload;
        },
        setActivePage: (state, { payload }) => {
            state.activePage = payload;
        },
        setApplication: (state, { payload }) => {
            setItem('app', payload);
            state.application = payload;
        },
        setNavigation: (state, { payload }) => {
            setItem('navigation', payload);
            state.navigation = payload;
        },
        setThemeMode: (state, { payload }) => {
            setItem('themeMode', payload);
            state.themeMode = payload;
        },
        setSearchKeyword: (state, { payload }) => {
            state.searchKeyword = payload;
        },
       
        setCaleg: (state, { payload }) => {
            state.caleg = payload;
        },
        setDapil: (state, { payload }) => {
            state.dapil = payload;
        },
        setKecamatan: (state, { payload }) => {
            state.kecamatan = payload;
        },
        setKelurahan: (state, { payload }) => {
            state.kelurahan = payload;
        },
        setSubSideNavActive: (state, { payload }) => {
            state.subSideNavActive = payload;
        },
        toggleSidebarMenu: (state) => {
            state.isSidebarMenuCollapsed = !state.isSidebarMenuCollapsed;
        },
        setWindowSize: (state, { payload }) => {
            state.screenSize = payload;
        },
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload;
            localStorage.setItem("currentPage", payload);
        },
        setAPIGoogle: (state, { payload }) => {
            state.apiGoogle = payload;
            localStorage.setItem("apiGoogle", payload);
        },
        setLanguage: (state, { payload }) => {
            state.language = payload
            localStorage.setItem("i18nextLng", payload);
            localStorage.setItem("I18N_LANGUAGE", payload);
        },
        setSidebar: (state, { payload }) => {
            state.siderbar = payload
            localStorage.setItem("sidebar", payload);
        },
        setCoordinates: (state, { payload }) => {
            state.coordinates = payload;
        },
        setDataInput: (state, { payload }) => {
            console.log("set data input ", payload);
            state.dataInput = payload;
        },
    }
});

export const { setAPIGoogle, toggleSidebarMenu, setWindowSize, setThemeMode,
    setSubSideNavActive, setNavigation, setActivePage,
    setApplication, setActiveFilters, setCallbackForm,
    setActivePaging, setLoading, setSearchKeyword,
    setLanguage,
    setCurrentPage,
    setSidebar,
    setCaleg,
    setDapil,
    setKecamatan,
    setKelurahan,
    setDataFilter,
    setCoordinates,
    setDataInput,
    setLoadingForm,
    setVisibiltyModal,
    setActiveFiltersChart
} = uiSlice.actions;

export default uiSlice.reducer;
