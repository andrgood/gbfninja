import { Elements, Tags, Character } from './types'

function retCharacters(): Character[] {
  return [
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

export default {
    characters: retCharacters()
}