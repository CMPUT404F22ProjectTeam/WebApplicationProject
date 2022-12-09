/**
 * Test login page with mock data and mock functions
 */
import HomePage from '../views/home/homePage';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('Home page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test Home page', async () => {
        const { container } = render(< HomePage />)
        const hello = container.getByText("Hello");
        const github = container.getByText("Github");

        expect(hello).toBeInTheDocument();
        expect(github).toBeInTheDocument();
    })
})
