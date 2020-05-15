import React from 'react'
import { render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import AbilitySearch from '../../../src/features/abilitySearch/abilitySearch'
import { AbilitySearchItemT } from '../../../src/features/abilitySearch/abilitySearchList'

const abilityList: AbilitySearchItemT[] = [
    {value: 'test', label: 'Test'},
    {value: 'another', label: 'Another'}
]

test('Loads abilitySearch and displays label, placeholder text and button', async () => {
    const onChange = jest.fn()

    render(<AbilitySearch abilityList={abilityList} onChange={onChange} />)

    expect(screen.getAllByLabelText('Choose a characteristic (Element, Race) or ability (Delay, Dispel)')).toBeTruthy()
    expect(screen.getAllByPlaceholderText('Type in characteristic (Element, Race) or ability (Delay, Dispel)')).toBeTruthy()
    expect(screen.getByRole('button')).toHaveTextContent('🠗')
    
})

test('List of abilities shown after click on the menu', async () => {
    const onChange = jest.fn()

    render(<AbilitySearch abilityList={abilityList} onChange={onChange} />)

    fireEvent.click(screen.getByText('🠗'))

    await waitFor(() => screen.getAllByRole('option'))

    expect(screen.getAllByRole('option')[0]).toHaveTextContent('Test')
    expect(screen.getAllByRole('option')[1]).toHaveTextContent('Another')
})


test('onChange called with selected item and input resets', async () => {
    const onChange = jest.fn()

    render(<AbilitySearch abilityList={abilityList} onChange={onChange} />)

    fireEvent.click(screen.getByText('🠗'))
    await waitFor(() => screen.getAllByRole('option'))

    fireEvent.click(screen.getAllByRole('option')[0])

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({value: 'test', label: 'Test'})

    expect(screen.queryAllByRole('option')).toEqual([])
})