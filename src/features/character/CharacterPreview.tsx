import React from 'react'

function CharacterPreview({ character }): React.ReactElement {
    return(
        <div className="card" style={{width: '150px'}}>
            <div className="card-image">
                <figure className="image">
                    <img src={`img/${character.id}.jpg`} alt={`${character.name} picture`} />
                </figure>
            </div>
            <div className="card-content">
                <h5 className="title is-5">{ character.name }</h5>
            </div>
        </div>
    )
}

export default CharacterPreview