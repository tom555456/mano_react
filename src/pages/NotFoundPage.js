import React from 'react'

// import MyBanner from '../components/MyBanner'
import { Image } from 'react-bootstrap'
import ErrDown from '../components/ErrDown.svg'
import ErrUp from '../components/ErrUp.svg'

function NotFoundPage() {
  return (
    <>
      {/* <MyBanner title="找不到網頁" lead="找不到網頁頁面" /> */}
      <div className="box" style={{ background: '#a8b38b' }}>
        <div className="container">
          <div className="row">
            <div
              className="col-2"
              style={{ margin: '0 auto', marginBottom: '20px' }}
            >
              <Image src={ErrDown} className="down" />
            </div>
            <div className="col-12">
              <h1>
                <p className="title">
                  THE PAGE YOU'RE LOOKING FOR CAN'T BE FOUND!
                </p>
              </h1>
            </div>
            <div className="col-2" style={{ margin: '0 auto' }}>
              <Image src={ErrUp} className="up" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage