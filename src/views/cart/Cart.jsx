import React from 'react'
import { useNavigate } from 'react-router-dom';



export const Cart = () => {

    const navigate = useNavigate();

    const logout = () => {
      console.log("ACA");
       navigate("/");
    }

  return <>
  <button type="button" style={{marginTop: "15vh"}} onClick={logout}>
      Go home
    </button>
  </>
}
