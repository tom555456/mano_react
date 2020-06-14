import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList'
import CourseList from './pages/CourseList/CourseList'
import Cart from './pages/Cart'
import Membercenter from './pages/Membercenter'

import CartComfirm from "./pages/CartComfirm"
import CartComplete from "./pages/CartComplete"
import CartPayment from "./pages/CartPayment"
import CartComfirmChange from "./pages/CartComfirmChange"

import NotFoundPage from './pages/NotFoundPage'
import MemberLogin from './pages/MemberLogin'

import ProtectedRoute from './utils/ProtectedRoute'

function App(props) {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 錯誤訊息陣列
  const [loginErrors, setLoginErrors] = useState([])

  // 會員是否登入狀態(認証狀態)
  const [auth, setAuth] = useState(false)

  // 處理會員登入
  const loginProcess = (loginSuccessCallback) => {
    const errors = []

    // 檢查錯誤
    if (name === '') errors.push('姓名沒填')
    if (username === '') errors.push('帳號沒填')
    if (password === '') errors.push('密碼沒填')

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
        <MyNavbar auth={auth} name={name}/>
        <MainContent>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/shop/:second?/:third?/:fourth?/:page?">
              <ProductList />
            </Route>
            <Route path="/course/:second?/:third?/:fourth?/:page?">
              <CourseList />
            </Route>
            <Route path="/searchtest">
            
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

            <Route path="/cart/payment">
              <CartPayment />
            </Route>
            <Route path="/cart/complete">
              <CartComplete />
            </Route>

            <Route path="/memberlogin">
              <MemberLogin
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
            {/* <ProtectedRoute path="/todoapp">
              <TodoApp todos={todos} setTodos={setTodos} isAuth={auth} />
            </ProtectedRoute> */}
            <Route exact path="/membercenter">
              <Membercenter />
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
