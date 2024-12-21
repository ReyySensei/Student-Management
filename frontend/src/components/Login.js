import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import holycross from "../images/holycross.png";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call onLogin from the parent (App.js) to set authentication state
        onLogin(email, password);

        // If credentials are correct, navigate to the home page
        if (email === "admin@gmail.com" && password === "admin123") {
            navigate("/home");
        } else {
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img src={holycross} alt="Logo" style={styles.logo} />
                <h2 style={styles.heading}>Welcome Back!</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Log In</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, white, red)",
    },
    card: {
        background: "#fff",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
    },
    logo: {
        maxWidth: "50%",
        height: "auto",
        marginBottom: "20px",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        margin: "10px 0 20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "10px",
        margin: "10px 0",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        width: "100%",
        boxSizing: "border-box",
    },
    button: {
        padding: "10px",
        marginTop: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "none",
        background: "#4facfe",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s",
    },
};

export default Login;
