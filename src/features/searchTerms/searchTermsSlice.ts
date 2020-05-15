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

const initialState: SearchTerm[] = []

const searchTermsSlice = createSlice({
    name: 'searchTerms',
    initialState: initialState,
    reducers: {
        addSearchTerm: {
            reducer(state, action: PayloadAction<SearchTerm>) {
                const { id, name, group = 'must', value = null } = action.payload
                console.log(action.payload)
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
        }
    }
})

export { SearchTerm }

export const { addSearchTerm } = searchTermsSlice.actions

export default searchTermsSlice.reducer