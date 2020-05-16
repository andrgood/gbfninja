import React from 'react'
import { Tags } from '../../db/types'

import Element from './Element'

type AbilityT = {
    id: string;
    name: string;
    value: string | number | null;
    leftArrow: boolean;
    rightArrow: boolean;
}

const abilityMap: Map<string, React.FC<AbilityT>> = new Map()

abilityMap.set(Tags.Element, Element)

export default abilityMap