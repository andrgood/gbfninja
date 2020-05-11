import { reject, cloneDeep } from 'lodash'
import { AbilitySearchItem } from '../components/AbilitySearch'

type groupState = AbilitySearchItem[]

type actions = 'add' | 'remove'

interface GroupReducerAction {
    type: actions;
    payload?: any;
}

export const groupInitialState: groupState = []

export function groupReducer(state: groupState, action: GroupReducerAction): groupState {
    switch(action.type) {
        case 'add': {
            return [...state, action.payload]
        }
        case 'remove': {
            const newState = cloneDeep(state)
            return reject(newState, (_, index) => index === action.payload.index)
        }
        default: {
            throw new Error()
        }
    }
}