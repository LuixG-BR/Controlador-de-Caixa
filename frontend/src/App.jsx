import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Lancamentos from "./pages/Lancamentos";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";


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
            path="/usuarios"
            element={<Usuarios />}
          />
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App;