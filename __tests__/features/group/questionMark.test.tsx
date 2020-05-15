import React from 'react'
import { render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import QuestionMark from '../../../src/features/group/QuestionMark'

test('QuestionMark renders and match snapshot', async () => {
    const { container } = render(<QuestionMark hoverHelp="Test Hover" />)
    expect(container).toMatchSnapshot()
})