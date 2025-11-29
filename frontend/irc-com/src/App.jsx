import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/Detail";
import AddTenderPage from "./pages/AddTenderPage";
import EditTenderPage from "./pages/EditTenderPage";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/add" element={<AddTenderPage />} />
        <Route path="/edit/:id" element={<EditTenderPage />} />
      </Routes>
    
  );
}

export default App;
