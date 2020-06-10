import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import MyBanner from '../components/MyBanner'

function Home(props) {
  //console.log(props)
  return (
    <>
      <MyBanner title="首頁" lead="首頁是一個網站的第一個看到的頁面" />
      <div>
        <a href="/about">About - a tag</a>
        <br />
        <Link to="/about">About - Router Link</Link>
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

export default withRouter(Home)
