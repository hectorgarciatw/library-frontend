import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data.login.value;
            // Puedes decodificar el token para obtener información del usuario si es necesario
            const userData = { username, token }; // Esto es solo un ejemplo
            onLogin(userData);
        },
        onError: (error) => {
            console.error("Login error:", error.message);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
