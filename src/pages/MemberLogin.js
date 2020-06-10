import React from 'react'

import MyBanner from '../components/MyBanner'
import MyBreadcrumb from '../components/MyBreadcrumb'
import { withRouter } from 'react-router-dom'

function MemberLogin(props) {
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
    alert('登入成功，跳回首頁')
    props.history.push('/', { from: '從登入頁來的' })
  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert('登出成功，跳回上一頁')
    props.history.goBack()
  }

  const displayButton = auth ? (
    <button
      className="btn btn-primary mb2"
      onClick={() => {
        logoutProcess(logoutSuccessCallback)
      }}
    >
      登出
    </button>
  ) : (
    <button
      className="btn btn-primary mb2"
      onClick={() => {
        loginProcess(loginSuccessCallback)
      }}
    >
      登入
    </button>
  )

  const displayForm = auth ? (
    ''
  ) : (
    <>
      <input
        className="form-control mb2"
        type="text"
        value={name}
        placeholder="請輸入姓名"
        onChange={(event) => {
          setName(event.target.value)
        }}
      />
      <input
        className="form-control mb2"
        type="text"
        value={username}
        placeholder="請輸入帳號"
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <input
        className="form-control mb2"
        type="text"
        value={password}
        placeholder="請輸入密碼"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
    </>
  )

  return (
    <>
      <MyBanner title="會員登入頁" lead="會員登入頁頁面" />
      <MyBreadcrumb />
      {displayErrors}
      <div className="form-inline">
        {displayForm}
        {displayButton}
      </div>
    </>
  )
}

export default withRouter(MemberLogin)
