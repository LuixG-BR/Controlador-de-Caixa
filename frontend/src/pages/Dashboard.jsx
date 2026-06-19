import { useAuth } from "../auth/AuthContext";


function Dashboard() {


    const { usuario, logout } = useAuth();

    return (

        <div>

            <h1>Dashboard</h1>

            <h2>Bem vindo, {usuario?.nome}</h2>

            <button onClick={logout}>Sair</button>
            
        </div>

    )
}

export default Dashboard;