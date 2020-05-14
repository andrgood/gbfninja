import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { useSelect } from 'downshift'
import _ from 'lodash'
import db from '../../db/db'

const elementSearchList  = _.chain(db).get('elementSearchList').value()

import { GroupType } from '../Group'

const handleStyle: React.CSSProperties = {
    cursor: 'move'
}

interface ElementI {
    name: GroupType;
    id: number;
    insideItem: any;
    moveFromGroupToGroup(): void;
    changeItem(id: number, item: any): void;
}

function Element({name, id, moveFromGroupToGroup, changeItem, insideItem}: ElementI): React.ReactElement {

    const [inputItems, setInputItems] = useState(elementSearchList)

    const [{ opacity }, drag, preview] = useDrag({
        item: { id, type: 'ability'},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    })

    const {
        isOpen, getToggleButtonProps, selectedItem,
        getMenuProps, highlightedIndex, getItemProps,
        reset
    } = useSelect({
        items: inputItems,
        itemToString: (item) => {
            return item == null ? '' : String(item.label)
        },
        initialSelectedItem: insideItem.value !== '' ? insideItem : null, 
        onSelectedItemChange: (changes) => {
            if(changes.selectedItem !== null) {
                changeItem(id, changes.selectedItem)
            }
        }
    })

    return(
        <React.Fragment>
        <div className="input-group" ref={ preview } style = { {marginTop: '2px', opacity} }>
            {
                name === 'may' ?
                <div className="input-group-prepend">
                    <button className="btn btn-primary" type="button" onClick={ moveFromGroupToGroup }>🡰</button>
                </div>
                : null
            }
            <div className="input-group-prepend"  ref={drag} style={handleStyle}>
                <span className="input-group-text"  >Element</span>
            </div>
            
            <input className="form-control" placeholder="" value={ insideItem?.label } {...getToggleButtonProps()} />
            <div className={isOpen ? `dropdown-menu show`: `dropdown-menu`} style={{'marginLeft': '5.13rem'}} {...getMenuProps()} >
                {isOpen &&
                inputItems.map((item, index) => (
                    <span 
                        className={
                            highlightedIndex === index ? 'dropdown-item active' : 'dropdown-item'
                        }
                        key={`${item.value}${index}`}
                        {...getItemProps({item, index})}
                    >
                        {item.label}
                    </span>
                ))
                }
            </div>
            

            {
                name === 'must' ?
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={ moveFromGroupToGroup }>🡲</button>
                </div>
                : null
            }
            
        </div>
        </React.Fragment>
    )
}

export default Element