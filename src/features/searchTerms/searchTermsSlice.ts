import { createSlice, PayloadAction, createNextState, Draft, nanoid } from '@reduxjs/toolkit'

type SearchTerm = {
    id: string;
    group: 'must' | 'may';
    name: string;
    value: string | number | null;
}

interface SearchTermInitialPayload {
    group?: 'must' | 'may';
    name: string;
    value?: string | number;
}

interface SearchTermValue {
    id: string;
    value: string | number | null;
}

interface SearchTermId {
    id: string;
}

const initialState: SearchTerm[] = []

const searchTermsSlice = createSlice({
    name: 'searchTerms',
    initialState: initialState,
    reducers: {
        addSearchTerm: {
            reducer(state, action: PayloadAction<SearchTerm>) {
                const { id, name, group = 'must', value = null } = action.payload
                state.push( { id, group, name, value } )
            },
            prepare(payload: SearchTermInitialPayload) {
                return createNextState(
                    { payload },
                    (draft: Draft<PayloadAction<SearchTerm>>) => {
                        draft.payload.id = nanoid()
                        return draft
                    }
                )
            }
        },
        deleteSearchTerm(state, action: PayloadAction<SearchTermId>) {
            const { id } = action.payload
            return state.filter(term => term.id !== id)
        },
        changeSearchTermValue(state, action: PayloadAction<SearchTermValue>) {
            const { id, value } = action.payload
            state.find(term => term.id === id).value = value
        },
        toogleGroup(state, action: PayloadAction<SearchTermId>) {
            const { id } = action.payload
            const term = state.find(term => term.id === id)
            if(term.group === 'must') {
                term.group = 'may'
                return
            }
            if(term.group === 'may') {
                term.group = 'must'
                return
            }
        }
    }
})

export { SearchTerm }

export const { addSearchTerm, changeSearchTermValue, deleteSearchTerm, toogleGroup } = searchTermsSlice.actions

export default searchTermsSlice.reducer