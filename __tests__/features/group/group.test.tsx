import React from 'react'
import { render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { SearchTerm } from '../../../src/features/searchTerms/searchTermsSlice'
import Group from '../../../src/features/group/Group'

test('Group renders and match snapshot', async () => {
    const testItems: SearchTerm[] = [
        {   id: 'testId',
            group: 'must',
            name: 'testName',
            value: 'testValue',
        }
    ]
    const { container } = render(<Group header="Test" hoverHelp="Test Hover" items={testItems}/>)
    expect(container).toMatchSnapshot()

})