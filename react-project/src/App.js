import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout/Checkout";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import { DataProvider } from "./store/DataContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
