import _ from 'lodash'
type GroupT = 'must' | 'may'

type ItemT = {
    name: string;
    label: string;
    value: string;
}

type SearchItemT = {
    id: number;
    value: string;
    label: string;
    group: GroupT;
    item?: ItemT;
}

type ActionsT = 'addSearchItem' | 'changeGroup' | 'changeItem'

type ActionT = {
    type: ActionsT;
    payload?: any;
}

export const initialState: SearchItemT[] = []

export default function main(state: SearchItemT[], action: ActionT): SearchItemT[] {
    switch(action.type) {
        case 'addSearchItem': {
            return [
                ...state,
                { item: { label: '', value: ''}, ...action.payload}
            ]
        }
        case 'changeItem': {
            return state.map(searchItem => {
                if(searchItem.id === action.payload.id) {
                    return {
                        ...searchItem,
                        item: action.payload.item
                    }
                }
                return searchItem
            })
        }
        case 'changeGroup': {
            return state.map(item => {
                if(item.id === action.payload.id) {
                    let newGroup: GroupT = 'must'
                    if(item.group === 'must') {
                        newGroup = 'may'
                    }
                    if(item.group === 'may') {
                        newGroup = 'must'
                    }
                    return {...item, group: newGroup}
                }
                return item
            })
        }
        default: {
            return state
        }
    }
}