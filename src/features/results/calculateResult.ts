import { map, filter, reject, contains, difference, pipe, isEmpty, without } from 'lodash/fp'
import { matchTypes } from './matchTypes'
import { determinateMatchType } from './determinateMatchType'
import { SearchTerm } from '../searchTerms/searchTermsSlice'
import { Character, CharacterKeys, Tags } from '../../db/types'

const calculateResult = (searchTerms: SearchTerm[]) => (data: Character[]) => {
  if(isEmpty(searchTerms)) {
    return []
  }
  const checkedCharacters = map((char: Character) => checkCharacter(searchTerms)(char))(data)
  return reject(ele => isEmpty(ele))(checkedCharacters)
}

const checkCharacter = (searchTerms: SearchTerm[]) => (data: Character) => {
  const pipeFunc = pipe([
    getTagsFromTerms,
    allTagsInData(data),
    checkValues(searchTerms)
  ])

  return pipeFunc(searchTerms)
}

function getTagsFromTerms(searchTerms: SearchTerm[]) {
  return map((term: SearchTerm) => term.name)(searchTerms)
}

const allTagsInData = (data: Character) => (tags: string[]) => {
  if( difference(tags)(data.tags).length  === 0) {
    return data
  }

  return {}
}

const checkValues = (searchTerms: SearchTerm[]) => (data: Character) => {
  const checkedTerms = filter((term: SearchTerm) => {
    const match = determinateMatchType(term.name)(matchTypes)
    if ( match(data[term.name as CharacterKeys])(term.value) ) {
      return true
    }
    return false
  })(searchTerms)

  if( checkedTerms.length === searchTerms.length ) {
    return data
  }
  
  return {}
  
}

export { getTagsFromTerms, allTagsInData, checkValues, checkCharacter }
export default calculateResult