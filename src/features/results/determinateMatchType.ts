import { contains } from 'lodash/fp'
import { matchTypesT } from './matchTypes'
import { exact } from './matchingFunctions/exact'

const determinateMatchType = (termName: string) => (matchTypes: matchTypesT) => {
    if( contains(termName)(matchTypes.exact) ) {
        return exact
    }
}

export { determinateMatchType }