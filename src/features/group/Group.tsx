import React from 'react'
import { SearchTerm } from '../searchTerms/searchTermsSlice'

import QuestionMark from './QuestionMark'

interface GroupProps {
    header: string;
    hoverHelp: string;
    items: SearchTerm[];
}

function Group( { header, hoverHelp, items }: GroupProps): React.ReactElement {
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
                    return (
                        <p key={`${item.name}-${index}`}>{index} - {item.name} - {item.value}</p>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Group