import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await api.post("/user/login", { email, password });
            if (response.status === 200) {
                setUser(response.data.user);
                sessionStorage.setItem("token", response.data.token);
                api.defaults.headers["authorization"] =
                    "Bearer " + response.data.token;
                setError("");
                navigate("/");
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="display-center">
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Form className="login-box" onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </Form.Group>
                <div className="button-box">
                    <Button type="submit" className="button-primary">
                        Login
                    </Button>
                    <span>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;