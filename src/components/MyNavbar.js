import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { MdShoppingCart, MdKeyboardArrowRight }from "react-icons/md"

function MyNavbar(props) {
  const { auth, name } = props

  const loginButton = (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          props.history.push('/login')
        }}
      >
        登入
      </Button>
    </>
  )
  const logoutButton = (
    <>
      <span style={{ color: '#ffffff' }}>{name}, 你好</span>
      <Button
        variant="outline-light"
        onClick={() => {
          props.history.push('/welcome')
        }}
      >
        登出
      </Button>
    </>
  )

  const displayButton = auth ? logoutButton : loginButton

  const nav = (
        <>
          <Navbar bg="primary" variant="dark" fixed="top">
            <Navbar.Brand href="/">抹の</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                關於我們
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login">
                會員登入
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shop" onClick={() => localStorage.setItem("page",1)}>
                產品列表
              </Nav.Link>
              <Nav.Link as={NavLink} to="/course" onClick={() => localStorage.setItem("page",2)}>
                課程列表
              </Nav.Link>
              <Nav.Link as={NavLink} to="/membercenter"> 
                Member center
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart">
                購物車
              </Nav.Link>
              <Nav.Link as={NavLink} to="/searchtest">
                Search Test
              </Nav.Link>
            </Nav>
            <Form inline>{displayButton}</Form>
          </Navbar>
        </>
      )

    const cartNav = (
        <>
        <Navbar>
            <Navbar.Brand href="/">抹の</Navbar.Brand>
            <Nav className="mr-auto justify-content-end w-75 align-items-center">
              <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center" disabled exact >
                購物車 <MdShoppingCart className="ml-1" />
              </Nav.Link>
              <MdKeyboardArrowRight className="ml-1" /><MdKeyboardArrowRight className="mr-1" />
              <Nav.Link as={NavLink} to="/cart/comfirm" disabled>
                確認訂單
              </Nav.Link>
              <MdKeyboardArrowRight className="ml-1" /><MdKeyboardArrowRight className="mr-1" />
              <Nav.Link as={NavLink} to="/cart/payment" disabled>
                付款
              </Nav.Link>
              <MdKeyboardArrowRight className="ml-1" /><MdKeyboardArrowRight className="mr-1" />
              <Nav.Link as={NavLink} to="/cart/complete" disabled>
                完成訂單
              </Nav.Link>
            </Nav>
          </Navbar>
        </>
    )

    let displayNav;
    const path = props.history.location.pathname;
    
    if(path === "/cart" || path === "/cart/comfirm" || path === "/cart/complete" || path === "/cart/payment" ) displayNav = cartNav
    else if(path === "/cart/comfirm/change" || path === "/login" || path === "/welcome") displayNav = "";
    else displayNav = nav
    

  return (
    <>
      {displayNav}
    </>
  )
}

export default withRouter(MyNavbar)
