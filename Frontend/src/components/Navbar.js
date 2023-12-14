import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { Icon } from '@iconify/react';

export default function Navbar() {

  const [cartView,setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FF_Cafe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link fs-5 active" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken"))?
              <li className="nav-item">
                <Link className="nav-link fs-5 active" aria-current="page" to="/myorder">My Orders</Link>
              </li>
              :""
          }
          </ul>
          {(!localStorage.getItem("authToken"))?
            <div className='d-flex'>

              <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>

              <Link className="btn bg-white text-success mx-1 " to="/createuser">Signup</Link>
            </div>
           :<div>
              <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>
                My Cart {<Icon icon="game-icons:hot-meal" color="green" />}
                <Badge pill bg="danger">{data.length?data.length:""}</Badge>
              </div>
              {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>:null}
              <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>
                Logout
              </div>
            </div>
          }

         
        </div>
      </div>
    </nav>
  )
}

