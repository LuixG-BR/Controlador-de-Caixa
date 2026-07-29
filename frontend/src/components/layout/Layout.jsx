import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";

import "./Layout.css";

function Layout() {

    const [menuAberto, setMenuAberto] = useState(false);

    return (

        <div className="layout">
            <button
                className="btn-menu"
                onClick={() => setMenuAberto(!menuAberto)}
            >
                ☰
            </button>

            <Sidebar
                menuAberto={menuAberto}
                fecharMenu={() => setMenuAberto(false)}
            />

            <main className="conteudo">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;