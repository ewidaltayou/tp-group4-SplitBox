import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;