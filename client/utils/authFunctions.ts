import axios from "axios";

export async function handleSignup(userData:any) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!res.ok) throw new Error('Signup failed');
    return res.json();
}

export async function handleLogin(credentials:any) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
    }

    return res.json(); // returns { token, user }
}
