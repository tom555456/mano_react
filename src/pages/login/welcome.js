import React from 'react'
import './login.scss'
// import MyBanner from '../../components/MyBanner'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { withRouter } from 'react-router-dom'

function MyWelcome(props) {
  const {
    logoutProcess
  } = props

  //continue shop的callback
  const continueShopCallback = () => {
    alert('開始購物囉!!!')
    props.history.push('/shop', { from: '從登入頁來的' })
  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert('登出成功，跳回上一頁')
    localStorage.removeItem('member')
    props.history.push('/login', { from: '從welcome來的' })
  }

  const displayButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock logoutBtn"
        onClick={() => {
          logoutProcess(logoutSuccessCallback)
        }}
      >
        Logout
      </button>
    </div>
  )

  const member = JSON.parse(localStorage.getItem('member')) || [{memberName: ""}]

  const displayForm = (
    <>
      <div className="bg position-relative d-flex">
        <div className="bgLeft">
          <div className="loginInput">
            <div className="loginBlock">
              <h4>{member[0].memberName}</h4>
            </div>
            <div className="loginBlock">
              <h1>Welcome</h1>
              <button
                className="btn btn-primary mb2 loginBlock continueShopBtn"
                onClick={() => {
                  continueShopCallback()
                }}
              >
                Continue shop
              </button>
              {displayButton}
            </div>
          </div>
        </div>
        <div className="bgRight-welcome"></div>
      </div>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyWelcome)
