import React from 'react'
import { SearchTerm } from '../searchTerms/searchTermsSlice'

import QuestionMark from './QuestionMark'

import { Tags } from '../../db/types'
import abilityMap from '../ability/abilityMap'

interface GroupProps {
    name: 'must' | 'may';
    header: string;
    hoverHelp: string;
    items: SearchTerm[];
}

function Group( { name, header, hoverHelp, items }: GroupProps): React.ReactElement {
    
    const left = name === 'must' ? false : true
    const right = name === 'must' ? true : false

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    { header }
                    &nbsp;
                    <QuestionMark hoverHelp={hoverHelp} />
                </div>
            </div>
            <div className="card-content">
            {
                items.map((item, index) => {
                    const Ability = abilityMap.get(item.name)
                    return (
                        <Ability
                            key={ item.id }
                            id={ item.id }
                            name={ item.name }
                            value={ item.value }
                            leftArrow = { left }
                            rightArrow = { right }
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default Group