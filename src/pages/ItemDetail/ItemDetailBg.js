import React, { Component } from 'react'
import './ItemDetailBg.css'

function ItemDetailBg() {
  const display = (
    <>
      <div className="bgSvg"></div>
    </>
  )

  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default ItemDetailBg
