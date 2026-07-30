import { useAuth } from "../../../auth/AuthContext";


function Dashboard() {


    const { logout } = useAuth();

    return (

        <div>

            <h1>Dashboard</h1>

            <h2>Bem-vindo</h2>

            <button onClick={logout}>Sair</button>
            
        </div>

    )
}

export default Dashboard;