import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Layout from "./components/shared/layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoutes from "./Pages/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* protect the routes */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
