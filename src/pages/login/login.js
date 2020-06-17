import React, { useState, useEffect } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'

function MyLogin(props) {
  const {
    data,
    setData,
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    loginProcess,
    logoutProcess,
    loginErrors,
    auth,
  } = props

  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`)
    const json = await response.json()
    const items = json.rows
    setData(items)

    return data
  }

  // 錯誤訊息陣列的呈現
  const displayErrors = loginErrors.length ? (
    <div className="alert alert-danger" role="alert">
      <ul className="list-unstyled">
        {loginErrors.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  ) : (
    ''
  )

  // login成功時的callback
  const loginSuccessCallback = () => {
    localStorage.setItem("member", JSON.stringify(data))
    alert('登入成功，跳到Welcome')
    props.history.push('/welcome', { from: '從登入頁來的' })
  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert('登出成功，跳回上一頁')
    props.history.goBack()
  }

  const forgetCallback = () => {
    props.history.push('/forgetpwd', { from: '從登入頁來的' })
  }

  const registerCallback = () => {
    props.history.push('/register', { from: '從登入頁來的' })
  }

  const displayButton = auth ? (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock"
        onClick={() => {
          logoutProcess(logoutSuccessCallback)
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock"
        onClick={() => {
          getData(username)
          loginProcess(loginSuccessCallback)
        }}
      >
        Login
      </button>
    </div>
  )

  const forgetButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock forgetBtn"
        onClick={() => {
          logoutProcess(forgetCallback)
        }}
      >
        forget password?
      </button>
    </div>
  )

  const registerButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock registerBtn"
        onClick={() => {
          logoutProcess(registerCallback)
        }}
      >
        register
      </button>
    </div>
  )

  const displayForm = auth ? (
    ''
  ) : (
    <>
      <div className="bg position-relative d-flex">
        <div className="bgLeft">
          <div className="loginInput">
            <div className="loginBlock">
              <h5>Account</h5>
              <input
                className="form-control mb2"
                type="text"
                value={username}
                placeholder="請輸入帳號"
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
            </div>
            <div className="loginBlock">
              <h5>Password</h5>
              <input
                className="form-control mb2"
                type="password"
                value={password}
                placeholder="請輸入密碼"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <div className="loginBlock">
                <button
                  className="btn btn-primary mb2 loginBlock loginBtn"
                  onMouseEnter={() => {
                    console.log(data)
                    getData(username)
                  }}
                  onClick={() => {
                    loginProcess(loginSuccessCallback)
                  }}
                >
                  Login
                </button>
              </div>
              {registerButton}
              {forgetButton}
              {displayErrors}
            </div>
          </div>
        </div>
        <div className="bgRight-login"></div>
      </div>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyLogin)
