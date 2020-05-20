import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AbilitySearch from '../features/abilitySearch/AbilitySearch'
import Results from '../features/results/Results'

import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { addSearchTerm } from '../features/searchTerms/searchTermsSlice'
import { getResults } from '../features/results/resultsSlice'
import Group from '../features/group/Group'
import { RootState } from '../store/store'

function Search(): React.ReactElement {

    const dispatch = useDispatch()

    const searchTerms = useSelector((state: RootState) => state.searchTerms)
    const mustGroupTerms = useSelector((state: RootState) => state.searchTerms.filter(term => term.group === 'must'))
    const mayGroupTerms = useSelector((state: RootState) => state.searchTerms.filter(term => term.group === 'may'))
    const searchResults = useSelector((state: RootState) => state.results.resultItems)

    useEffect(() => {
        dispatch(getResults({terms: searchTerms}))
    }, [dispatch, searchTerms])

    return (
        <React.Fragment>
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
                        <Results results={ searchResults }/>
                    </div>
                </div>
            </div>
        </section>
        <footer className="footer">
        <div className="content has-text-centered">
          <p>Granblue Fantasy content and materials are trademarks and copyrights of Cygames, Inc. or its licensors. All rights reserved.</p>
        </div>
      </footer>
      </React.Fragment>
    )
}

export default Search