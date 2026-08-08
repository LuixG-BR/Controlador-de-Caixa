import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


function PermissionRoute({children, perfil}){

    const { usuario } = useAuth();


    if(
        !usuario ||
        usuario.id_perfil !== perfil
    ){
        return <Navigate to="/dashboard"/>
    }

    return children;
}

export default PermissionRoute;