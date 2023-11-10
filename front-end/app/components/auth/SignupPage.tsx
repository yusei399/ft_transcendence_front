"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { AuthSignUpData, AuthSignUpResponse } from '../../shared/HttpEndpoints/auth/SignUp';

const SignupPage: React.FC = () => {
    const [data, setData] = useState<AuthSignUpData>({
        nickname: '',
        email: '',
        password: '',
        avatarUrl: ''
    });
    const [response, setResponse] = useState<AuthSignUpResponse | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let body: Partial<AuthSignUpData> = {};
            for (const key in data) {
                if (data[key as keyof AuthSignUpData]) {
                    body = { ...body, [key]: data[key as keyof AuthSignUpData] };
                }
            }
            const result = await axios.post<AuthSignUpResponse>('http://localhost:3333/auth/signup', body);
            setResponse(result.data);
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
                    <label>Email: </label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Avatar URL (optional): </label>
                    <input type="url" name="avatarUrl" value={data.avatarUrl} onChange={handleChange} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>User ID: {response.userId}</p>
                    <p>Nickname: {response.nickname}</p>
                    <p>Avatar URL: {response.avatarUrl}</p>
                </div>
            )}
        </div>
    );
}

export default SignupPage;
