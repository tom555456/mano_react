import React from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'

function MyForgetPwd(props) {
  const {
    username,
    setUsername,
    auth,
  } = props

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
                placeholder="請輸入您的帳號"
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
            </div>
            <div className="loginBlock">
              <h5>Confirm mail sent</h5>
              <div className="loginBlock">
                <button
                  className="btn btn-primary mb2 loginBlock loginBtn"
                  onClick={() => {}}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bgRight-forgetPwd"></div>
      </div>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyForgetPwd)
