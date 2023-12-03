"use client";

import React, { useState } from 'react';
import { HttpSignIn } from '../../shared/HttpEndpoints/auth/SignIn';

const SigninPage: React.FC = () => {
    const [reqData, setReqData] = useState<HttpSignIn.reqTemplate>({
        nickname: '',
        password: ''
    });
    const [response, setResponse] = useState<HttpSignIn.resTemplate | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReqData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await new HttpSignIn.requestSender(reqData).sendRequest();
            setResponse(res);
            localStorage.setItem('token', res.authToken);
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
                    <label>Password: </label>
                    <input type="password" name="password" value={reqData.password} onChange={handleChange} />
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