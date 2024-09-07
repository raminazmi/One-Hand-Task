import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import navbarIcon from './assets/images/navbar-icon.svg';
import websiteIcon from './assets/images/website-icon.svg';

const Login = () => {
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("12345678");
    const [uid, setUid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const uidParam = new URLSearchParams(window.location.search).get("uid");
        setUid(uidParam);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://one-hand/login", {
                email,
                password,
                uid,
            }, {
                headers: {
                    "X-secret-key": "OH2024",
                },
            });
            if (response.data && response.data.token) {
                Cookies.set("token", response.data.token, { path: "/" });
                navigate('/home');
            } else {
                console.error("No token received in response");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <div className="logo">
                    <img src={navbarIcon} alt="Black IN Dashboard" />
                    <h1>Black IN Dashboard</h1>
                </div>

                <button className="go-to-website">
                    <img src={websiteIcon} alt="Black IN Dashboard" />
                    <h4>Go To Website</h4>
                </button>
            </header>
            <div className="login-box">
                <div className="login-title">
                    <div>
                        <h2>BLACK</h2>
                        <img src={navbarIcon} alt="Black IN Dashboard" />
                    </div>
                    <h3>Log In</h3>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
