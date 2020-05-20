import { configureStore, combineReducers } from '@reduxjs/toolkit'

import searchTermsSlice from '../features/searchTerms/searchTermsSlice'
import resultsSlice from '../features/results/resultsSlice'

const rootReducer = combineReducers({
    searchTerms : searchTermsSlice,
    results: resultsSlice
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default store