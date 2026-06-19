import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import api from "../api/api";


function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const resposta = await api.post("/login", {

                email: email,
                senha: senha
            });

            console.log(resposta.data);

            login({

                token: resposta.data.access_token,
                usuario: resposta.data.usuario
            });

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Email ou senha inválidos");
        }
    }


    return (

        <div>

            <h1>
                Controlador de Caixa
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button type="submit">
                    Entrar
                </button>

            </form>

        </div>
    )
}

export default Login;