import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { useCombobox } from 'downshift'
import _ from 'lodash'

import { changeSearchTermValue, deleteSearchTerm, toogleGroup } from '../searchTerms/searchTermsSlice'
import { Elements } from '../../db/types'

const elementList = [
    {value: Elements.Fire, label: 'Fire'},
    {value: Elements.Wind, label: 'Wind'},
    {value: Elements.Dark, label: 'Dark'},
    {value: Elements.Water, label: 'Water'},
    {value: Elements.Light, label: 'Light'},
    {value: Elements.Earth, label: 'Earth'},
    {value: Elements.Rainbow, label: 'Rainbow'}
]

const handleStyle: React.CSSProperties = {
    cursor: 'move'
}

interface ElementI {
    id: string;
    name: string;
    value: string | number | null;
    leftArrow: boolean;
    rightArrow: boolean;
}

function Element({id, name, value, leftArrow, rightArrow}: ElementI): React.ReactElement {

    const [inputItems, setInputItems] = useState(elementList)
    const [dropMargin, setDropMargin] = useState(0)

    const dispath = useDispatch()

    const [{ opacity }, drag, preview] = useDrag({
        item: { id, type: 'ability'},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    })

    const dropWidthRef = useCallback(node => {
        if (node !== null) {
            setDropMargin(node.getBoundingClientRect().width)
        }
    }, [])

    const {
        getLabelProps,
        getComboboxProps,
        getInputProps,
        getToggleButtonProps,
        isOpen,
        getMenuProps,
        highlightedIndex,
        getItemProps,
        setInputValue
    } = useCombobox({
        items: inputItems,
        defaultSelectedItem: elementList.find(element => element.value === value),
        itemToString: (item) => {
            return item == null ? '' : String(item.label)
        },
        onInputValueChange: ({inputValue}) => {
            setInputItems(
                elementList.filter(item => {
                    return item.label.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
                })
            )
        },
        onIsOpenChange: (changes) => {
            if(changes.isOpen === true && changes.inputValue !== '') {
                setInputValue('')
            }
        },
        onSelectedItemChange: (changes) => {
            if(changes.selectedItem !== null) {
                dispath(changeSearchTermValue({id, value: changes.selectedItem.value}))
            }
        }
    })

    return(
        <React.Fragment>
            <div className="field has-addons" {...getComboboxProps()} ref={ preview } style={{marginBottom: '0', opacity}}>
                <label className="is-sr-only" {...getLabelProps()}>Choose an Element</label>
                <div className="control">
                    {leftArrow ? <button type="button" className="button is-warning" style={{width: '60px'}} onClick={() => { dispath(toogleGroup({id})) }}>🡰</button> : null}
                </div>
                <div className="control" ref={drag} style={handleStyle} >
                    <span className="button is-static" ref={dropWidthRef}>Element</span>
                </div>
                <div className="control is-expanded">
                    <input className="input" type="text" placeholder="Type in Element" {...getInputProps()} {...getToggleButtonProps()} />
                </div>
                <div className="control">
                    <button type="button" className="button is-primary" {...getToggleButtonProps()} aria-label={'toggle menu'} >🠗</button>
                </div>
                <div className="control">
                    <button type="button" className="button is-danger" onClick={() => { dispath(deleteSearchTerm({id}))} }>✖</button>
                </div>
                <div className="control">
                    {rightArrow ? <button type="button" className="button is-warning" style={{width: '60px'}} onClick={() => { dispath(toogleGroup({id})) }}>🡲</button> : null}
                </div>
            </div>

            <div className={isOpen ? `dropdown is-active`: `dropdown`} {...getMenuProps()} style={{marginLeft: `${(leftArrow ? 60 : 0 ) + dropMargin}px`}}>
                <div className="dropdown-menu">
                    <div className="dropdown-content">
                        {isOpen &&
                        inputItems.map((item, index) => (
                            <a 
                                className={
                                    highlightedIndex === index ? 'dropdown-item is-active' : 'dropdown-item'
                                }
                                key={`${id}_${item.value}`}
                                {...getItemProps({item, index})}
                            >
                                {item.label}
                            </a>
                        ))
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Element