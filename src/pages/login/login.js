import React from 'react'
import './login.scss'
// import MyBanner from '../../components/MyBanner'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { withRouter } from 'react-router-dom'

function MyLogin(props) {
  const {
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
    alert('登入成功，跳到Welcome')
    props.history.push('/welcome', { from: '從登入頁來的' })
  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert('登出成功，跳回上一頁')
    props.history.goBack()
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
          loginProcess(loginSuccessCallback)
        }}
      >
        Login
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
                type="text"
                value={password}
                placeholder="請輸入密碼"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              {displayButton}
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
