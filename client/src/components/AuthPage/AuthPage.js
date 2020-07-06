import React, { useState, useEffect, useContext } from 'react';

import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { AuthContext } from '../../context/AuthContext';

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch(e) {}
    }

    const handleLogin = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        } catch(e) {}
    }

    return (
        <div>
            <h1>Short link</h1>

            <div className="card">
                <h3>Authorize</h3>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">Email</label>
                            </td>
                            <td>
                                <input
                                    id="email"
                                    value={form.email}
                                    type="text"
                                    placeholder={'Enter email'}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="password">Password</label>
                            </td>
                            <td>
                                <input
                                    id="password"
                                    value={form.password}
                                    type="password"
                                    placeholder={'Enter password'}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>


                <div className="card-actions">
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                    >Log in</button>

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                    >Register</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;