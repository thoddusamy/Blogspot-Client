import { createContext, useState, useReducer } from 'react'

const INITIAL_STAGE = {
    user: null,
    isFetching: false,
    error: false
}

export const ContextApi = createContext(INITIAL_STAGE)

export const DataProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(false)
    const [userData, setUserData] = useState({})

    return (
        <ContextApi.Provider
            value={{ authToken, setAuthToken, userData, setUserData }}
        >
            {children}
        </ContextApi.Provider>
    )
}