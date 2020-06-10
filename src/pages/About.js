import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import MyBanner from '../components/MyBanner'
import MyBreadcrumb from '../components/MyBreadcrumb'

function About(props) {
 // console.log(props)

  return (
    <>
      <MyBanner title="關於我們" lead="首頁是一個網站的第一個看到的頁面" />
      <MyBreadcrumb />
      <div>
        <a href="/">Home - a tag</a>
        <br />
        <Link to="/">Home - Router Link</Link>
      </div>
      <hr />
      <div>
        <a href="/todoapp">Todo - a tag</a>
        <br />
        <Link to="/todoapp">Todo - Router Link</Link>
      </div>
    </>
  )
}

// 高階元件的用法
export default withRouter(About)
