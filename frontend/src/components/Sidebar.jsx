import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


function Sidebar() {

    const { usuario, logout } = useAuth();


    return (
        <aside>
            <h2>Controlador Caixa</h2>

            <nav>
                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/lancamentos">
                    Lançamentos
                </Link>

                <Link to="/relatorios">
                    Relatórios
                </Link>

                {
                    usuario?.id_perfil === 1 &&

                    <Link to="/usuarios">
                        Usuários
                    </Link>
                }

                {
                    usuario?.id_perfil === 1 &&

                    <Link to="/congregacoes">
                        Congregações
                    </Link>
                }
            </nav>

            <button onClick={logout}>
                Sair
            </button>

        </aside>
    )
}

export default Sidebar;