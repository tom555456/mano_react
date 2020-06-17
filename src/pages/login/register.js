import React, { useEffect, useState } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'

var sha1 = require('sha1')

function MyRegister(props) {
  const [insertData, setInsertData] = useState('')

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

  async function insertMemberToServer(item) {
    const request = new Request('http://localhost:3002/member/insertMember', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log('After JSON: ', JSON.stringify(item))

    const response = await fetch(request)
    const data = await response.json()
  }

  const displayForm = auth ? (
    ''
  ) : (
    <>
      <div className="bg position-relative d-flex">
        <div className="bgLeft">
          <div className="loginInput">
            <div className="loginBlock">
              <h5>Name</h5>
              <input
                className="form-control mb2"
                type="text"
                placeholder="請輸入姓名暱稱"
                onChange={(event) => {
                  setInsertData({
                    ...insertData,
                    memberName: event.target.value,
                  })
                }}
              />
              <h5>Account</h5>
              <input
                className="form-control mb2"
                type="text"
                placeholder="請輸入信箱帳號"
                onChange={(event) => {
                  setInsertData({
                    ...insertData,
                    email: event.target.value,
                  })
                }}
              />
            </div>
            <div className="loginBlock">
              <h5>Password</h5>
              <input
                className="form-control mb2"
                type="password"
                placeholder="請輸入密碼"
                onChange={(event) => {
                  setInsertData({
                    ...insertData,
                    pwd: sha1(event.target.value),
                  })
                }}
              />
              <h5>Confirm</h5>
              <input
                className="form-control mb2"
                type="password"
                placeholder="再次確認密碼"
              />
              <div className="loginBlock">
                <button
                  className="btn btn-primary mb2 loginBlock loginBtn"
                  onClick={() => {
                    insertMemberToServer(insertData)
                    alert('註冊成功，跳回登入頁')
                    props.history.push('/login', { from: '從register來的' })
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bgRight-register"></div>
      </div>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyRegister)
