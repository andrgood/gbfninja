import { Tags } from '../../db/types'

type AbilitySearchItemT = {
    value: string;
    label: string;
}

const abilitySearchList= [
    {value: Tags.Element, label: 'Element'},
    {value: Tags.MaxHp, label: 'Max HP'}
]

export { AbilitySearchItemT }

export default abilitySearchList as AbilitySearchItemT[]