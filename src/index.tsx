import './main.scss'

import db from './db'
import React, { useReducer, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import AbilitySearch from './components/AbilitySearch'
import Group from './components/Group'
import Results from './components/Results'
import { search, mustSearch } from './search'

const abilitySearchList  = _.chain(db).get('abilitySearchList').value()
const count  = _.chain(db).get('characters').value().length
const characters  = _.chain(db).get('characters').value()

import mainReducer, { initialState } from './reducers/searchItems'

function App(): React.ReactElement {

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


    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h2>GranblueFantasy ability search</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <AbilitySearch
                        abilitySearchList = {abilitySearchList}
                        onChange = { (selectedItem): void => { 
                            mainStateDispatch({type: 'addSearchItem', payload: {...selectedItem, id: genId, group:'must'}})
                            setGenId(prevState => (prevState + 1))
                        } }
                    />
                </div>
            </div>
            <DndProvider backend={Backend}>
                <div className="row mt-1">
                    <div className="col-sm-6">
                        <Group
                            name="must"
                            header="Must"
                            hoverHelp="All elements in here must be present, so if you have Delay and Dispel it's only gonna show characters who have both"
                            items={mainState.filter(item => item.group === 'must')}
                            moveFromGroupToGroup = {moveFromGroupToGroup}
                            changeItem = {changeItem}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Group
                            name="may"
                            header="May" 
                            hoverHelp="Only one element must be true, so if you have Delay and Dispel here, it's gonna show character who have just Delay, just Dispel or both"
                            items={mainState.filter(item => item.group === 'may')}
                            moveFromGroupToGroup = {moveFromGroupToGroup}
                            changeItem = {changeItem}
                        />
                    </div>
                </div>
            </DndProvider>
            <div className="row" style={{'marginTop': '5px'}}>
                <div className="col">
                    <Results count={ count } elements={result}/>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))