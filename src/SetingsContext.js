import { createContext, useContext, useReducer } from "react";
import { PARAMS } from "./Urls";
export const default_limit = 5

const INITIAL_SETTING ={
    loading: false,
    categories: [],
    difficulty: null,
    selectedCategories: [],
    limit: default_limit,
    errorMsg: null,

}

export const SETTING_ACTION = {
    SETTING_FETCH_START: 'settingFetchStart',
    SETTING_FETCH_SUCCESS: 'settingFetchSuccess',
    SETTING_FETCH_ERROR: 'settingFetchError',
    SETTING_SUBMIT: 'settingSubmit',
    SETTING_RESET: 'settingReset'
}


function settingReducer(settingState, action) {
    switch(action.type){

        case SETTING_ACTION.SETTING_FETCH_START:{
            return{
                ...settingState,
                loading: true,
                errorMsg: null,
            }
        }
        
            case SETTING_ACTION.SETTING_FETCH_SUCCESS:{
                return{
                    ...settingState,
                    loading: false,
                    errorMsg: null,
                    categories: Object.keys(action.categories)
                }
            }
            
            case SETTING_ACTION.SETTING_FETCH_ERROR:{
                return{
                    ...settingState,
                    loading: false,
                    errorMsg: action.msg,
                }
            }

            case SETTING_ACTION.SETTING_RESET:{
                return {
                    ...INITIAL_SETTING,
                    categories: action.categories
                }
            }

            case SETTING_ACTION.SETTING_SUBMIT:{

                if (action.selectCategories) {
                    PARAMS.categories = action.selectCategories.join(',')
                }
                if (action.difficult) {
                    PARAMS.difficulty = action.difficult
                }
                if (action.limit) {
                    PARAMS.limit = action.limit
                }

                return{
                    ...settingState,
                    loading: false,
                    errorMsg: null,
                    selectedCategories: action.selectCategories,
                    difficulty: action.difficult,
                    limit: action.limit
                }
            }

    }
}


const SettingContext = createContext(INITIAL_SETTING)
const SettingsDispatchContext = createContext(null)

export function SettingProvider({ children }) {
    const [settingState, dispatch] = useReducer(
        settingReducer,
        INITIAL_SETTING
    );
  
    return (
        <SettingContext.Provider value={settingState}>
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingsDispatchContext.Provider>
        </SettingContext.Provider>
    );
  }

export function useSettings() {
    return useContext(SettingContext);
}
  
export function useSettingDispatch() {
    return useContext(SettingsDispatchContext);
}






