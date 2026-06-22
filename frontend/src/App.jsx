import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Lancamentos from "./pages/Lancamentos";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Congregacoes from './pages/Congregacoes';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import PermissionRoute from "./routes/PermissionRoute";


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