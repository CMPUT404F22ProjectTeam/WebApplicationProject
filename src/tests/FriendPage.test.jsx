/**
 * Test login page with mock data and mock functions
 */
import FriendPage from '../views/friend/friendPage';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('Friend page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test Friend page', async () => {
        const { container } = render(< FriendPage />)
        const title = container.getByText("True Friends");

        expect(title).toBeInTheDocument();
    })
})
