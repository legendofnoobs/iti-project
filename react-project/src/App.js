import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout/Checkout";
import Footer from "./components/footer/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
