import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";


function Layout(){

    return (

        <div>
            <Sidebar />

            <main>
                <Outlet />
            </main>
        </div>

    )
}
export default Layout;