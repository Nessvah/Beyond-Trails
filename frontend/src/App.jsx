import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { router } from "./routes/routes";

import "react-toastify/dist/ReactToastify.css";
import TablePontos from "./components/gestor/PontosTuristicos/TablePontos";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
