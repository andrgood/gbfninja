import React, { useState } from 'react'
import { groupBy, chain, filter} from 'lodash'
import db from '../db/db'

interface ResultsI {
    count: number;
    elements: any;
}

function Results({ count, elements }: ResultsI): React.ReactElement {

    return (
        <div className="card">
            <div className="card-header">
                Searching across { count } characters...
            </div>
            <div className="card-body">
                <p>{ elements[0]?.name }</p>
            </div>
        </div>
    )
}

export default Results