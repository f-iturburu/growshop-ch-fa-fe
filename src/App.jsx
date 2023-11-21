import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/Footer/Footer"
import { Error404 } from "./views/Error404/Error404"
import { Home } from "./views/home/home";
import { Cart } from "./views/cart/Cart";
import { Login } from "./views/login/Login";
import { SignUp } from "./views/signUp/signUp"
import axios from "axios"

function App() {
  const [productsQuantity, setProductsQuantity] = useState(0)
  const ADMIN_LOGIN_KEY = import.meta.env.VITE_ADMIN_LOGIN_KEY;
  const USER_LOGIN_KEY = import.meta.env.VITE_USER_LOGIN_KEY;
  const URL = import.meta.env.VITE_BASE_API_URL;
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    fetchCart()
  },[])

  const fetchCart = async () =>{
    try {
      if (token) {
        const res = await axios.get(`${URL}/cart`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token.token,
          }})
          const data = res.data
          setProductsQuantity(data.totalProducts)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar adminLoginKey={ADMIN_LOGIN_KEY}
        userLoginKey={USER_LOGIN_KEY} URL={URL} productsQuantity={productsQuantity} setProductsQuantity={setProductsQuantity}/>
       <Routes>
        <Route exact path="/" element={<Home URL={URL} productsQuantity={productsQuantity} setProductsQuantity={setProductsQuantity}/>}/>
        <Route exact path="/cart" element={<Cart URL={URL}/>}/>
        <Route exact path="/login" element={<Login URL={URL}/>}/>
        <Route exact path="/signUp" element={<SignUp URL={URL}/>}/>
        <Route exact path="*" element={<Error404 />} />
       </Routes>
       <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
