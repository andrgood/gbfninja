import React, {useState, useReducer, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import mainReducer, { initialState } from '../reducers/searchItems'
import { search, mustSearch } from '../search'

import db from '../db/db'
const count  = _.chain(db).get('characters').value().length
const characters  = _.chain(db).get('characters').value()

import AbilitySearch from '../features/abilitySearch/AbilitySearch'
import Results from '../components/Results'

import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { addSearchTerm } from '../features/searchTerms/searchTermsSlice'
import Group from '../features/group/Group'
import { RootState } from '../store/store'

function Search(): React.ReactElement {

    const dispatch = useDispatch()

    const [genId, setGenId] = useState(1)
    const [mainState, mainStateDispatch] = useReducer(mainReducer, initialState)
    const [result, setResult] = useState([])

    function moveFromGroupToGroup(id: number): void {
        mainStateDispatch({type: 'changeGroup', payload: {id: id}})
    }

    function changeItem(id: number, item: any): void {
        mainStateDispatch({type:'changeItem', payload: {id: id, item: item}})
    }

    console.log(mainState)

    useEffect(() => {
        if(mainState.length > 0) {
            const searchObj = mainState.map(element => {
                return {
                    group: element.group,
                    name: element.item.name,
                    value: element.item.value
                }
            })
            const groupedObj = _.groupBy(searchObj, 'group')
            console.log(search(groupedObj.must[0], characters))
            if(groupedObj.must[0].name) {
                setResult(search(groupedObj.must[0], characters))
            }
            
        }
    }, [mainState])

    const mustGroupTerms = useSelector((state: RootState) => state.searchTerms.filter(term => term.group === 'must'))
    const mayGroupTerms = useSelector((state: RootState) => state.searchTerms.filter(term => term.group === 'may'))

    return (
        <section className="section">
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column has-text-centered">
                        <h2 className="title">GranblueFantasy ability search</h2>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <AbilitySearch
                            onChange = { (selectedItem) => { 
                                mainStateDispatch({type: 'addSearchItem', payload: {...selectedItem, id: genId, group:'must'}})
                                setGenId(prevState => (prevState + 1))
                                dispatch(addSearchTerm({name: selectedItem.value}))
                            } }
                        />
                    </div>
                </div>
                <DndProvider backend={Backend}>
                    <div className="columns">
                        <div className="column">
                            <Group
                                name="must"
                                header="Must"
                                hoverHelp="All elements in here must be present, so if you have Delay and Dispel it's only gonna show characters who have both"
                                items={mustGroupTerms}
                            />
                        </div>
                        <div className="column">
                            <Group
                                name="may"
                                header="May"
                                hoverHelp="Only one element must be true, so if you have Delay and Dispel here, it's gonna show character who have just Delay, just Dispel or both"
                                items={mayGroupTerms}
                            />
                        </div>
                    </div>
                </DndProvider>
                <div className="columns">
                    <div className="column">
                        <Results count={ 5 } elements={result}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search