import { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import api from "../../../api/api";
import notificacoes from "../../../utils/toast";

import "./Login.css"

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

        <div className="login-container">
            <div className="login-card">

                <h1>Controlador de Caixa</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login</label>
                        <input
                            type="text"
                            placeholder="User"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>


                    <div className="form-acoes">
                        <button type="submit" className="btn btn-primary">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;