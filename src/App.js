import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList'
import ItemDetail from './pages/ItemDetail/ItemDetail'

import CourseList from './pages/CourseList/CourseList'
import CourseDetail from './pages/CourseDetail/CourseDetail'

import CartComfirm from "./pages/CartComfirm"
import CartComfirmChange from "./pages/CartComfirmChange"
import CartComplete from "./pages/CartComplete"
import CartPayment from "./pages/CartPayment"
import Cart from './pages/Cart'
import Membercenter from './pages/Membercenter'
import Coupon from './pages/Coupon'

import NotFoundPage from './pages/NotFoundPage'

import Login from './pages/login/login'
import MyWelcome from './pages/login/welcome'
import MyRegister from './pages/login/register'
import MyForgetPwd from './pages/login/forgetPwd'
import Faq from './pages/Faq'


import ProtectedRoute from './utils/ProtectedRoute'
var sha1 = require('sha1');


function App(props) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])


  // 錯誤訊息陣列
  const [loginErrors, setLoginErrors] = useState([])

  // 會員是否登入狀態(認証狀態)
  const [auth, setAuth] = useState(false)

  // 處理會員登入
  const loginProcess = (loginSuccessCallback) => {
    const errors = []

    // 檢查錯誤
    if (data.length === 0) {
      errors.push('email not exist')
    } else {
      if (sha1(password) !== data[0].pwd) errors.push('wrong pwd')
    }
    if (username === '') errors.push('Account is empty')
    if (password === '') errors.push('Password is empty')


    if (errors.length > 0) {
      setLoginErrors(errors)
      return
    }

    // 清空錯誤訊息陣列 + 登入
    // 清空錯誤訊息陣列為必要
    setLoginErrors([])
    setAuth(true)

    // 執行成功的callback(來自MemberLogin)
    loginSuccessCallback()
  }

  const logoutProcess = (logoutSuccessCallback) => {
    setName('')
    setUsername('')
    setPassword('')

    // 認証改為false
    setAuth(false)

    // 執行成功的callback(來自MemberLogin)
    logoutSuccessCallback()
  }

  return (
    <Router>
      <>
        <MyNavbar auth={auth} name={name} />
        <MainContent>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/shop/:second?/:third?/:fourth?/:page?">
              <ProductList />
            </Route>
            <Route path="/itemDetail">
              <ItemDetail />
            </Route>

            <Route path="/course/:second?/:third?/:fourth?/:page?">
              <CourseList />
            </Route>
            <Route path="/courseDetail">
              <CourseDetail />
            </Route>

            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/cart/comfirm" exact>
              <CartComfirm />
            </Route>
            <Route path="/cart/comfirm/change">
              <CartComfirmChange />
            </Route>
            <Route path="/cart/complete">
              <CartComplete />
            </Route>
            <Route path="/cart/payment">
              <CartPayment />
            </Route>


            <Route path="/searchtest"></Route>
            <Route path="/login">
              <Login
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                auth={auth}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/welcome">
              <MyWelcome
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                auth={auth}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/register">
              <MyRegister
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                auth={auth}
              />
            </Route>

            <Route path="/forgetpwd">
              <MyForgetPwd
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                auth={auth}
              />
            </Route>

            <Route path="/faq">
              <Faq />
            </Route>

            {/* <ProtectedRoute path="/todoapp">
              <TodoApp todos={todos} setTodos={setTodos} isAuth={auth} />
            </ProtectedRoute> */}
            <Route exact path="/membercenter">
              <Membercenter />
            </Route>
            <Route exact path="/membercenter/coupon">
              <Coupon />
            </Route>


            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </MainContent>
        <MyFooter />
      </>
    </Router>
  )
}

export default App
