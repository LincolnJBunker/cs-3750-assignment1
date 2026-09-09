import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { login } from "../api";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const { user } = await login(email, password);
            navigate('/welcome', { state: user }); //success, navigate to /welcome page
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
        <div>
            <h3>Please login using the fields below</h3>
            <form onSubmit={handleSubmit}>
                <h5>Email:</h5>
                <input type="email" name="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <h5>Password:</h5>
                <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
            </form>
            {error && <p role="alert">{error}</p>}
            <h3>Need to create an account? Click the Sign Up button below</h3>
            <button type="button" onClick={handleSignUpClick}>Sign Up</button>
        </div>
        </>
    )
}
