import calculateResult, { getTagsFromTerms, allTagsInData, checkValues, checkCharacter } from '.../../../src/features/results/calculateResult'
import { SearchTerm } from '../../../src/features/searchTerms/searchTermsSlice'
import { Character } from '../../../src/db/types'

test('Get proper tags from search terms', async () => {
  const searchTerms: SearchTerm[] = [
    {
      id: '8RTar8yhiBXVcxsFIwr1L',
      group: 'must',
      name: 'element',
      value: 'fire'
    },
    {
      id: '8RTar8yhiBXVcxsFIwr1L',
      group: 'must',
      name: 'type',
      value: 'character'
    }
  ]

  expect(getTagsFromTerms(searchTerms)).not.toEqual(['element'])
  expect(getTagsFromTerms(searchTerms)).toEqual(['element', 'type'])
})

test('Check if all tags in data', async () => {
  const tags = ['element']
  const tags2 = ['element', 'delay']

  const data =
    {
      id:1,
      element: 'fire',
      name:'Anila',
      maxHp:2015,
      tags: ['element', 'maxHp']
    }

  expect(allTagsInData(data as Character)(tags)).toEqual(data)
  expect(allTagsInData(data as Character)(tags2)).toEqual({})
})

test('Check values from search terms and data', async () => {
  const searchTerms: SearchTerm[] = [
    {
      id: '8RTar8yhiBXVcxsFIwr1L',
      group: 'must',
      name: 'element',
      value: 'fire'
    }
  ]

  const searchTerms2: SearchTerm[] = [
    {
      id: '8RTar8yhiBXVcxsFIwr1L',
      group: 'must',
      name: 'element',
      value: 'dark'
    }
  ]

  const data =
    {
      id:1,
      element: 'fire',
      name:'Anila',
      maxHp:2015,
      tags: ['element', 'maxHp']
    }

  expect(checkValues(searchTerms)(data as Character)).toEqual(data)
  expect(checkValues(searchTerms2)(data as Character)).toEqual({})
})



test('Compare data with search term and return data', async () => {
    const searchTerms = [
        {
          id: '8RTar8yhiBXVcxsFIwr1L',
          group: 'must',
          name: 'element',
          value: 'fire'
        }
    ]
    
    const data =
        {
          id:1,
          element: 'fire',
          name:'Anila',
          maxHp:2015,
          tags: ['element', 'maxHp']
        }

    expect(checkCharacter(searchTerms as SearchTerm[])(data as Character)).toEqual(data)
})


test('Compare data with search term and return empty data', async () => {
    const searchTerms = [
        {
          id: '8RTar8yhiBXVcxsFIwr1L',
          group: 'must',
          name: 'element',
          value: 'dark'
        }
    ]
    
    const data =
        {
          id:1,
          element: 'fire',
          name:'Anila',
          maxHp:2015,
          tags: ['element', 'maxHp']
        }

    expect(checkCharacter(searchTerms as SearchTerm[])(data as Character)).toEqual({})
})

test('check Array of characters', async() => {
  const searchTerms: SearchTerm[] = [
    {
      id: '8RTar8yhiBXVcxsFIwr1L',
      group: 'must',
      name: 'element',
      value: 'fire'
    }
  ]

  const data = [
        {
          id:1,
          element: 'fire',
          name:'Anila',
          maxHp:2015,
          tags: ['element', 'maxHp']
        }
    ]

  const data2 = [
      {
        id:1,
        element: 'fire',
        name:'Anila',
        maxHp:2015,
        tags: ['element', 'maxHp']
      },
      {
        id:2,
        element: 'dark',
        name:'Anila',
        maxHp:2015,
        tags: ['element', 'maxHp']
      },
      {
        id:13,
        element: 'light',
        name:'Anila',
        maxHp:2015,
        tags: ['element', 'maxHp']
      }
  ]

  const data3 = [
    {
      id:1,
      element: 'wind',
      name:'Anila',
      maxHp:2015,
      tags: ['element', 'maxHp']
    },
    {
      id:2,
      element: 'dark',
      name:'Anila',
      maxHp:2015,
      tags: ['element', 'maxHp']
    },
    {
      id:13,
      element: 'light',
      name:'Anila',
      maxHp:2015,
      tags: ['element', 'maxHp']
    }
]

  expect(calculateResult(searchTerms)(data as Character[])).toEqual(data)
  expect(calculateResult(searchTerms)(data2 as Character[])).toEqual([data2[0]])
  expect(calculateResult(searchTerms)(data3 as Character[])).toEqual([])
})
