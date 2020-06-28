import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { AiOutlineMenu } from "react-icons/ai";
import { BsX } from "react-icons/bs"
import "../styles/burgerBar.scss"


function BurgerBar (props) {
    const [isToggle, setIsToggle] = useState(false)

    return(
        <>
        <div className="trans-5s" style={{position: "relative"}}>
          <div className={isToggle ? "burgerBar-show" : "burgerBar-hide"}>
            <AiOutlineMenu onClick={()=> setIsToggle(!isToggle)} className={isToggle ? "burgerBar-show-btn" : "burgerBar-hide-btn"}/>
            
              <ul className="d-flex flex-column burgerBar-lists">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
              </ul>
               
          </div>

        </div>
        </>
    )
}

export default withRouter(BurgerBar)