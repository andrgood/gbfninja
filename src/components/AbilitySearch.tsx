import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import { GroupType } from './Group'

export interface AbilitySearchItem {
    id?: number;
    group?: GroupType;
    value: string;
    label: string;
    item?: any;
}

interface AbilitySearchProps {
    onChange(selectedItem: AbilitySearchItem): void;
    abilitySearchList: AbilitySearchItem[];
}

function AbilitySearch({ onChange, abilitySearchList}: AbilitySearchProps): React.ReactElement {

    const [inputItems, setInputItems] = useState(abilitySearchList)

    const {
        isOpen, getMenuProps, getInputProps,
        getComboboxProps, highlightedIndex, getItemProps,
        reset
    } = useCombobox({
        items: inputItems,
        itemToString: (item) => {
            return item == null ? '' : String(item.label)
        },
        onInputValueChange: ({inputValue}) => {
            setInputItems(
                abilitySearchList.filter(item => {
                    return item.label.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
                })
            )
        },
        onSelectedItemChange: (changes) => {
            if(changes.selectedItem !== null) {
                onChange(changes.selectedItem)
            }
            reset()
        }
    })

    return(
        <React.Fragment>
            <div {...getComboboxProps()}>
                <input className="form-control" placeholder="Search by characteristic (Element, Race) or ability (Delay, Dispel)" {...getInputProps()} />
                <div className={isOpen ? `dropdown-menu show`: `dropdown-menu`} style={{marginLeft: '12px'}} {...getMenuProps()} >
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
            </div>
        </React.Fragment>
    )
}

export default AbilitySearch