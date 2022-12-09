/**
 * Test register page with mock data and mock functions
 */
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Signup from '../views/login/Signup';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ access: '1234567890', refresh: '0987654321' }),
    })
)

describe('Signup page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test signup page with working credentials', async () => {
        const { container } = render(<Signup />)
        const title = screen.getByText("Sign up");
        const signupButton = container.querySelector('button')
        const nameInput = container.querySelector('input[name="userName"]')
        const passwordInput = container.querySelector('input[name="password"]')
        const confirmPasswordInput = container.querySelector('input[name="confirmPassword"]')

        expect(title).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument()
        expect(nameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(confirmPasswordInput).toBeInTheDocument()

        // populate email and password and click register button
        fireEvent.change(nameInput, { target: { value: 'test' } })
        fireEvent.change(passwordInput, { target: { value: '12345678' } })
        fireEvent.change(confirmPasswordInput, { target: { value: '12345678' } })
        fireEvent.click(signupButton)

        // should redirect to login page
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })
})
