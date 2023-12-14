"use client";

import React, { useState } from 'react';
import {HttpSignUp } from '../../../shared/HttpEndpoints/auth/SignUp';

const SignupPage: React.FC = () => {
    const [reqData, setReqData] = useState<HttpSignUp.reqTemplate>({
        nickname: '',
        email: '',
        password: '',
        avatarUrl: ''
    });
    const [response, setResponse] = useState<HttpSignUp.resTemplate | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReqData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await new HttpSignUp.requestSender(reqData).sendRequest();
            setResponse(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nickname: </label>
                    <input type="text" name="nickname" value={reqData.nickname} onChange={handleChange} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={reqData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={reqData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Avatar URL (optional): </label>
                    <input type="url" name="avatarUrl" value={reqData.avatarUrl} onChange={handleChange} />
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
