import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, ShoppingCartOutlined, LoginOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Badge } from 'antd';

const Navbar = ({ adminLoginKey, userLoginKey, URL, productsQuantity, setProductsQuantity }) =>{
  const [current, setCurrent] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    if (location.pathname == "/") {
      setCurrent("home");
    }
  },[])

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
}
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <NavLink to="/">
        Inicio
       </NavLink>
      ),
      key: 'home',
      icon: <HomeOutlined />
    },
    token ? {
      icon: <ShoppingOutlined />,
      key: 'purchases',
      label: (
     <NavLink to="/purchases">
      Mis compras
     </NavLink>
      ),
    } : "",
    token ? {
      icon: <ShoppingCartOutlined />,
      key: 'cart',
      label: (
     <NavLink to="/cart">
      Mi carrito    
    {productsQuantity ?   <Badge count={productsQuantity} offset={[3, -15]}>
          </Badge> : ""}
     </NavLink>
     
      ),
    } : "",
    
    token ?   {
      icon: <UserOutlined />,
      key: 'profile',
      label: (
     <NavLink to="/profile">
      Mi perfil
     </NavLink>
      ),
    } : "",
    token ?   {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: (
     <NavLink to="/" onClick={logout}>
      Cerrar sesion
     </NavLink>
      ),
    } :
    {
      icon: <LoginOutlined />,
      key: 'login',
      label: (
     <NavLink to="/login">
      Ingresar
     </NavLink>
      ),
    }
  
  ];

return <>
   <Menu style={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: "2b9348" }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;

</>
}

export default Navbar