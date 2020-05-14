import React from 'react'
import { useDrop } from 'react-dnd'

import { AbilitySearchItem } from '../features/abilitySearch/AbilitySearch'
import abilityMap from './ability/abilityMap'

export type GroupType = 'must' | 'may'

interface GroupProps {
    header: string;
    name: GroupType;
    hoverHelp: string;
    items: AbilitySearchItem[];
    moveFromGroupToGroup(id: number): void;
    changeItem(id: number, item: any): void;
}

function Group({ header, items, name, hoverHelp, moveFromGroupToGroup, changeItem }: GroupProps): React.ReactElement {

    const [{ isOver }, drop] = useDrop({
        accept: 'ability',
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            moveFromGroupToGroup(item.id)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return(
        <div ref={drop} className="card">
            <div className="card-header">
            { header }
            &nbsp;
            <span 
                aria-label={hoverHelp}
                data-balloon-pos="right"
                data-balloon-length="large"
                className="tooltip-big-text"
            >
                <svg height="24" width="21" viewBox="0 0 14 16" version="1.1" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                </svg>
            </span>
            </div>
            <div className="card-body">
                {
                    items.map((item, index) => {
                        const Ability = abilityMap.get(item.value)
                        return <Ability
                            name={name}
                            key={`${item.value}${index}`}
                            index={index}
                            id={item.id}
                            insideItem={item.item}
                            moveFromGroupToGroup={() => moveFromGroupToGroup(item.id)}
                            changeItem={changeItem}
                        />
                    })
                }
            </div>
        </div>        
    )
}

export default Group