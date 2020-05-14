import { Elements, Tags } from './types'

export default {
    abilitySearchList: [
        {value: 'element', label: 'Element'},
        {value: 'maxHp', label: 'Max HP'}
    ],
    elementSearchList: [
        {name: 'element', value: Elements.Fire, label: 'Fire'},
        {name: 'element', value: Elements.Wind, label: 'Wind'}
    ],
    characters: [
        {
          id:1,
          element: Elements.Fire,
          name:'Anila',
          maxHp:2015,
          tags: [Tags.Element, Tags.MaxHp]
        },
        {
          id:2,
          element: Elements.Wind,
          name:'Andira',
          maxHp:1660,
          tags: [Tags.Element, Tags.MaxHp]
        }
      ]
}
