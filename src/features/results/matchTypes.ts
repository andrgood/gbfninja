import { Tags } from '../../db/types'

type matchTypesT = {
    exact: Tags[];
}

const matchTypes = {
    exact: [Tags.Element],
}

export {matchTypes, matchTypesT}