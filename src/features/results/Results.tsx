import React from 'react'
import CharacterPreview from '../character/CharacterPreview'
import { isEmpty } from 'lodash/fp'

interface ResultsProps {
    results: any[];
}

function Results({ results }: ResultsProps): React.ReactElement {

    console.log(results)

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    Searching across 5 characters...
                </div>
            </div>
            <div className="card-content">
                {
                    isEmpty(results) ? null :
                    results.map(character => {
                        return <CharacterPreview key={character.id} character={character} />
                    })
                }
            </div>
        </div>
    )
}

export default Results