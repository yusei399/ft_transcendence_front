"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { AuthSignInData, AuthSignInResponse } from '../../shared/HttpEndpoints/auth/SignIn';

const SigninPage: React.FC = () => {
    const [data, setData] = useState<AuthSignInData>({
        nickname: '',
        password: ''
    });
    const [response, setResponse] = useState<AuthSignInResponse | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let body: Partial<AuthSignInData> = {};
            for (const key in data) {
                if (data[key as keyof AuthSignInData]) {
                    body = { ...body, [key]: data[key as keyof AuthSignInData] };
                }
            }
            const result = await axios.post<AuthSignInResponse>('http://localhost:3333/auth/signin', body);
            setResponse(result.data);

            localStorage.setItem('authToken', result.data.authToken);
        } catch (err) {
            if (axios.isAxiosError(err))
                console.error('Axios Error during sign up:', err?.response?.data ?? err);
            else console.error('Error during sign up:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nickname: </label>
                    <input type="text" name="nickname" value={data.nickname} onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} />
                </div>
                <button type="submit">Sign In</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>Token: {response.authToken}</p>
                </div>
            )}
        </div>
    );
}

export default SigninPage;
