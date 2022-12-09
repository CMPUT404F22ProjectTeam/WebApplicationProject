/**
 * Test login page with mock data and mock functions
 */
import WorldPage from '../views/world/worldPage';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('World page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test World page', async () => {
        const { container } = render(< WorldPage />)
        const comment = container.getByText("Comment");

        expect(comment).toBeInTheDocument();
    })
})
