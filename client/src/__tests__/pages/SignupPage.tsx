import { screen, render } from '@testing-library/react'
import Signup from '../../pages/SignupPage/SignupPage'
import { BrowserRouter as Router } from 'react-router-dom';
import { wrapper } from '../../providers/reduxProvider';
import { HelmetProvider } from 'react-helmet-async';
import user from '@testing-library/user-event';

describe("SignIn", () => {
    const renderer = () => render(<HelmetProvider><Router>{wrapper(<Signup />)}</Router></HelmetProvider>)

    describe("with invalid email", () => {
        it("renders the email validation error", async () => {
            renderer()
            await user.type(await screen.findByPlaceholderText("Enter your email"), 'invalid email');
            user.click(screen.getByRole("button"));
            expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
        })
    })

    describe("with invalid password", () => {
        it("renders the password validation error", async () => {
            renderer()
            await user.type(await screen.findByPlaceholderText("Enter password"), '123');
            user.click(screen.getByRole("button"));
            expect(await screen.findByText('Password length should be at least 4 characters')).toBeInTheDocument()
        })
    })
})