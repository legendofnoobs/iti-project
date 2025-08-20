import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout/Checkout";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import About from "./pages/about/About";
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
          <Route
            path="/checkout"
            element={
              <Checkout
                checkoutData={{
                  product: "Denim Jacket",
                  quantity: 1,
                  price: "60.00",
                  subtotal: "60.00",
                  total: "60.00",
                }}
              />
            }
          />
          <Route path="/single-product" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
