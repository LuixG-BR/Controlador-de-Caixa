import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import notificacoes from "../utils/toast";


function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("username", email);
            formData.append("password", senha);

            const resposta = await api.post(
                "/auth/login",
                formData
            );

            // console.log(resposta.data);

            login({
                token: resposta.data.access_token,
                usuario: {
                    login: email
                }
            });

            navigate("/dashboard");

        } catch (error) {
            notificacoes.erro("Falha no login");
        }
    }

    return (

        <div>

            <h1>
                Controlador de Caixa
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="user"
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