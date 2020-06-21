import React, { useState, useEffect } from 'react'
import ImageSlider from 'react-image-comparison-slider'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import ReactCompareImage from 'react-compare-image'
import '../styles/Slider.css'

import img1 from '../homeImages/social2.svg'
import img2 from '../homeImages/shop.svg'

export default function Slider() {
  const [posx, setPosx] = useState(`${window.innerWidth * 0.5}`)

  useEffect(() => {
    console.log(window.innerHeight)
  }, [])

  function getCursorPosition(e) {
    var posx = 0
    if (!e) var e = window.event
    if (e.pageX) {
      posx =
        e.pageX - document.documentElement.scrollLeft - document.body.scrollLeft
    } else if (e.clientX || e.clientY) {
      posx = e.clientX
    }
    return setPosx(posx)
  }

  const life = (
    <div className="shop">
      <a href="/shop" onClick={() => localStorage.setItem('page', 1)}>
        <Button className="button-shop">SHOP →</Button>
      </a>
    </div>
  )

  const shop = (
    <div className="life">
      <a href="/life" onClick={() => localStorage.setItem('page', 1)}>
        <Button className="button-life">LIFE STYLE →</Button>
      </a>
    </div>
  )
  const both = (
    <div className="both">
      <Button href="/mall" className="button-shop2">
        SHOP →
      </Button>
      <Button href="/life" className="button-life2">
        LIFE STYLE →
      </Button>
    </div>
  )

  let display
  if (posx > window.innerWidth * 0.6) {
    display = life
  } else if (posx < window.innerWidth * 0.4) {
    display = shop
  } else {
    display = both
  }

  return (
    <>
      <div className="Slider">
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
          <ReactCompareImage
            leftImage={img2}
            rightImage={img1}
            sliderLineColor="#BD8A60"
            onSliderPositionChange={() => {
              getCursorPosition()
            }}
          />
        </div>
        {display}
      </div>
    </>
  )
}
