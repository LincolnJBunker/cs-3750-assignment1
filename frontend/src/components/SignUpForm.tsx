import { useState } from "react"
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { signup } from "../api";

export const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const { user } = await signup({ email, password, firstName, lastName, birthdate });
            navigate('/welcome', { state: user });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
        <div>
            <h3>Please fill out the following fields below</h3>
            <form onSubmit={handleSignUp}>
                <h5>First Name:</h5>
                <input type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <h5>Last Name:</h5>
                <input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <h5>Date of Birth:</h5>
                <input type="date" name="birthdate" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
                <h5>Email:</h5>
                <input type="email" name="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <h5>Password:</h5>
                <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" disabled={submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </div>
        </>
    )
}
