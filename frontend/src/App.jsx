import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";

import Dashboard from "./modules/dashboard/pages/Dashboard";
import Lancamentos from "./modules/lancamentos/pages/Lancamentos";
import Relatorios from "./modules/relatorios/pages/Relatorios";
import Usuarios from "./modules/usuarios/pages/Usuarios";
import Congregacoes from "./modules/congregacoes/pages/Congregacoes";
import Login from "./modules/auth/pages/Login.jsx";

import PermissionRoute from "./auth/PermissionRoute";
import ProtectedRoute from "./auth/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/lancamentos"
            element={<Lancamentos />}
          />

          <Route
            path="/relatorios"
            element={<Relatorios />}
          />

          <Route
            path="/congregacoes"
            element={
              <PermissionRoute perfil={1}>
                <Congregacoes />
              </PermissionRoute>
            } />

          <Route
            path="/usuarios"
            element={
              <PermissionRoute perfil={1}>
                <Usuarios />
              </PermissionRoute>
            } />
        </Route>

        

      </Routes>
    </BrowserRouter>

  )
}

export default App;