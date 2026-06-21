import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


export function AuthProvider({children}){

    const [usuario,setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario")) || null
    );

    const [token,setToken] = useState(
        localStorage.getItem("token") || null
    );


    function login(dados){

        setUsuario(dados.usuario);
        setToken(dados.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );

        localStorage.setItem(
            "token",
            dados.token
        );
    }

    function logout(){

        setUsuario(null);

        setToken(null);

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){

    return useContext(AuthContext);
}