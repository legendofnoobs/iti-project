import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout/Checkout";
import Footer from "./components/footer/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/checkout" element={<Checkout checkoutData={{"product":"Denim Jacket","quantity":1,"price":"60.00","subtotal":"60.00","total":"60.00"}}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
