/**
 * Test login page with mock data and mock functions
 */
import MessagePage from '../views/message/messagePage';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('Message page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test Message page', async () => {
        const { container } = render(< MessagePage />)
        const title = container.getByText("Here are your new messages!");

        expect(title).toBeInTheDocument();
    })
})
