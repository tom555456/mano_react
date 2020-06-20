import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { MdShoppingCart, MdKeyboardArrowRight } from 'react-icons/md'

function MyNavbar(props) {


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
  const member = JSON.parse(localStorage.getItem('member')) || [{ memberName: '' }]

  const logoutButton = (
    <>
      <span style={{ color: '#ffffff' }} className="mr-3">{member[0].memberName} , 您好</span>
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

  const displayButton = member[0].memberName !== '' ? logoutButton : loginButton
  const pathlist = [
    "/",
    "/about",
    "/product",
    "/todoapp",
    "/login",
    "/counter",
    "/membercenter",
    "/coupon",
    "/cart",
    "/course",
    "/faq",
    "/welcome",
    "/register",
    "/forgetpwd",
    "*",
    "/testupload",
    "/marketing",
    "/ItemTracking"
  ]
  const themenames = [
    "light",
    "light",
    "light",
    "light",
    "light",
    "light",
    "dark",
    "dark",
    "light",
    "light",
    "light",
    "light",
    "light",
    "light",
    "light",
    "light",
    "light",
    "light"
  ]


  // 先找出對應的主題
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes("/product")) locationPathname = "/product"
  if (locationPathname.includes("/coupon")) locationPathname = "/membercenter"
  if (locationPathname.includes("/cart")) locationPathname = "/cart"
  if (locationPathname.includes("/course")) locationPathname = "/course"

  
  const index = pathlist.findIndex((v) => v === locationPathname)

  const nav = (
    <>
      <Navbar variant={themenames[index]}>
        <Navbar.Brand href="/">抹の</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            關於我們
          </Nav.Link>

          {member[0].memberName !== '' ? (
            <Nav.Link as={NavLink} to="/membercenter">
              Member center
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/login">
              會員登入
            </Nav.Link>
          )}

          <Nav.Link
            as={NavLink}
            to="/shop"
            onClick={() => localStorage.setItem('page', 1)}
          >
            產品列表
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/course"
            onClick={() => localStorage.setItem('page', 1)}
          >
            課程列表
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ItemTracking">
            願望清單
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cart">
            購物車
          </Nav.Link>
          <Nav.Link as={NavLink} to="/marketing">
            Marketing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/testupload">
            Test Upload
          </Nav.Link>
          <Nav.Link as={NavLink} to="/faq">
            FAQ
          </Nav.Link>

        </Nav>
        <Form inline>{displayButton}</Form>
      </Navbar>
    </>
  )

  const cartNav = (
    <>
      <Navbar variant={themenames[index]}>
        <Navbar.Brand href="/">抹の</Navbar.Brand>
        <Nav className="mr-auto justify-content-end w-75 align-items-center">
          <Nav.Link
            as={NavLink}
            to="/cart"
            className="d-flex align-items-center"
            disabled
            exact
          >
            購物車 <MdShoppingCart className="ml-1" />
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link as={NavLink} to="/cart/comfirm" disabled>
            確認訂單
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link as={NavLink} to="/cart/payment" disabled>
            付款
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link as={NavLink} to="/cart/complete" disabled>
            完成訂單
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  )

  let displayNav
  const path = props.history.location.pathname

  if (
    path === '/cart' ||
    path === '/cart/comfirm' ||
    path === '/cart/complete' ||
    path === '/cart/payment'
  )
    displayNav = cartNav
  else if (
    path === '/cart/comfirm/change' ||
    path === '/'
  )
    displayNav = ''
  else displayNav = nav

  return <>{displayNav}</>
}

export default withRouter(MyNavbar)
