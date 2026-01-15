import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ProductDetails } from "./pages/ProductDetails";
import Favorites from "./pages/Favorites";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
