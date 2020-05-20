import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '../../db/types'
import DB from '../../db/db'
import { SearchTerm } from '../searchTerms/searchTermsSlice'
import calculateResult from './calculateResult'

type ResultState = {
    resultItems: Character[];
    characters: Character[];
}

const initialState: ResultState = {
    resultItems: [],
    characters: DB.characters
}

interface GetResults {
    terms: SearchTerm[]
}

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialState,
    reducers: {
        getResults(state, action: PayloadAction<GetResults>) {
            const { terms } = action.payload
            console.log()
            state.resultItems = calculateResult(terms)(state.characters) as Character[]
        }
    }
})

export const { getResults } = resultsSlice.actions

export default resultsSlice.reducer