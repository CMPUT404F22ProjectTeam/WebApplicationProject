/**
 * Test login page with mock data and mock functions
 */
import Login from '../views/login/Login';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('Login page', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('Test login with working credentials', async () => {
        const { container } = render(<Login />)
        const loginButton = container.querySelector('button')
        const nameInput = container.querySelector('input[name="username"]')
        const passwordInput = container.querySelector('input[name="password"]')

        expect(loginButton).toBeInTheDocument()
        expect(nameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()

        // populate name and password and click login button
        fireEvent.change(nameInput, { target: { value: 'test' } })
        fireEvent.change(passwordInput, { target: { value: '12345678' } })
        fireEvent.click(loginButton)

        // should redirect to login page
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })
})
