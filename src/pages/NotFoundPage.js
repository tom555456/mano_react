import React from 'react'

import MyBanner from '../components/MyBanner'
import { useEffect } from 'react'

function NotFoundPage(props) {
  useEffect(()=>{
    props.changeBackgroundColorLight()
  }, [])
  return (
    <>
      <MyBanner title="找不到網頁" lead="找不到網頁頁面" />
    </>
  )
}

export default NotFoundPage
