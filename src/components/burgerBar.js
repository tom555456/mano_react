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
            
              <ul className={isToggle ? "d-flex flex-column burgerBar-lists m-auto" : "d-flex flex-column burgerBar-lists barLists-disNone m-auto"}>
                <li><Link className="burgerListTitle" to="/">購物商城</Link>
                  <ul className="burgerBar-list mt-1">
                    <li><Link to="/">所有商品</Link></li>
                    <li><Link to="/">抹の食</Link></li>
                    <li><Link to="/">抹の衣</Link></li>
                    <li><Link to="/">抹の生活</Link></li>
                  </ul>
                </li>
                <li className="mt-3"><Link className="burgerListTitle" to="/">抹茶新生活</Link>
                  <ul className="burgerBar-list mt-1">
                    <li><Link to="/">課程報名</Link></li>
                    <li><Link to="/">抹茶地圖</Link></li>
                    <li><Link to="/">故事牆</Link></li>
                  </ul>
                </li>
                <li className="mt-3"><Link className="burgerListTitle" to="/">常見問題</Link></li>
                <li className="mt-3"><Link className="burgerListTitle" to="/">關於我們</Link></li>
              </ul>
              </div> 
        </div>
        </>
    )
}

export default withRouter(BurgerBar)