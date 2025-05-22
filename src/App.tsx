// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import ClientePage from "./components/ClientePage/ClientePage";
import OsPage from "./components/OsPage/OsPage";
import FinancePage from "./components/FinancePage/FinancePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/ordemServico" element={<OsPage />} />
        <Route path="/financeiro" element={<FinancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
