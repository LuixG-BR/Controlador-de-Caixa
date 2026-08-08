import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import "./Sidebar.css";

function Sidebar({ menuAberto, fecharMenu }) {

    const { usuario, logout } = useAuth();

    return (
        <aside className={`sidebar ${menuAberto ? "aberta" : ""}`}>

            <h2 className="logo">
                Controlador Caixa
            </h2>

            <nav className="menu">
                <Link
                    to="/dashboard"
                    onClick={fecharMenu}
                >
                    Dashboard
                </Link>

                <Link
                    to="/lancamentos"
                    onClick={fecharMenu}
                >
                    Lançamentos
                </Link>

                <Link
                    to="/relatorios"
                    onClick={fecharMenu}
                >
                    Relatórios
                </Link>

                {
                    usuario?.id_perfil === 1 &&
                    <Link
                        to="/usuarios"
                        onClick={fecharMenu}
                    >
                        Usuários
                    </Link>
                }

                {
                    usuario?.id_perfil === 1 &&
                    <Link
                        to="/congregacoes"
                        onClick={fecharMenu}
                    >
                        Congregações
                    </Link>
                }
            </nav>

            <button
                className="btn btn-sair"
                onClick={() => {
                    fecharMenu();
                    logout();
                }}
            >
                Sair
            </button>
        </aside>
    );
}

export default Sidebar;