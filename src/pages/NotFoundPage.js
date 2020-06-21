import React from 'react'

// import MyBanner from '../components/MyBanner'
import { Image } from 'react-bootstrap'
import ErrDown from '../components/ErrDown.svg'
import ErrUp from '../components/ErrUp.svg'
import './NotFoundPage-style.css'

function NotFoundPage() {
  return (
    <>
      {/* <MyBanner title="找不到網頁" lead="找不到網頁頁面" /> */}

      <div className="box">
        <div className="inside">
          <Image src={ErrDown} className="down" />
          <h1>
            <p className="title">THE PAGE YOU'RE LOOKING FOR CAN'T BE FOUND!</p>
          </h1>
          <Image src={ErrUp} className="up" />
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
