import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router-dom"

function MyFooter(props) {


  useEffect(()=>{
    console.log(props.history)
  },[])
  //document.body.style.background ='#5C6447'
  const cssSocial = {
    height: '250px',
    lineHeight: 'center',
    borderTop: '1px solid #5C6447',
    borderBottom: '1px solid #5C6447',
  }
  const cssSvg = {
    height: '35px',
    margin: '10px',
    backgroundColor: '#5C6447',
  }
  const cssImg = {
    transform: '90',
  }

  const footer = (
    <>
      <footer className="footer mt-auto py-3 text-center ">
        <div className="container mb-2">
          <h3> 最新活動 </h3>
          <div className="d-flex row" style={{ backgroundColor: '#C5895A' }}>
            <img className="col-8" style={cssImg} src="/picture/CS001.jpg"></img>
            <div
              className="col-4 align-self-center"
              style={{ color: '#FFFFFF' }}
            >
              <h5>從抹茶製作過程，</h5>
              <h5>投入其中，</h5>
              <h5>精進技藝，反覆練習</h5>
              <h5>屬於大人的手作課程</h5>
              <Button variant="outline-light">給自己的練習課</Button>
            </div>
          </div>

          <img className="m-2 p-2" src="/picture/mano_logo_dark-01.svg"></img>



          <div className="d-flex row" style={cssSocial}>
            <div className="col-lg align-self-center">
            <a style={{ color: '#5C6447' }} href={props.history.location.pathname.includes("/mall") ? "/mall/about" : "/life/about"}>About us</a>
              <br />
              <a style={{ color: '#5C6447' }} href={props.history.location.pathname.includes("/mall") ? "/mall/faq" : "/life/faq"}>FAQ</a>
              <br />
              <a style={{ color: '#5C6447' }} href={props.history.location.pathname.includes("/mall") ? "/mall/membercenter" : "/life/membercenter"}>Member Center</a>
            </div>
            <div className="col-lg align-self-center">
              <a>
                <img style={cssSvg} src="/picture/facebook.svg"></img>
              </a>
              <a>
                <img style={cssSvg} src="/picture/instagram.svg"></img>
              </a>
              <a>
                <img style={cssSvg} src="/picture/twitter.svg"></img>
              </a>
            </div>
            <div className="col-lg align-self-center">
              <a style={{ color: '#5C6447' }} href="/mall">Shop</a>
              <br />
              <a style={{ color: '#5C6447' }} href="/life">Life Style</a>
              <br />
              <a style={{ color: '#5C6447' }} href={props.history.location.pathname.includes("/mall") ? "/mall/contact" : "/life/contact"}>Contact Us</a>
            </div>
          </div>
          <span className="text-muted">2020 MANO copyright</span>
        </div>
      </footer>
    </>
  )

  const path = props.history.location.pathname;
  let displayFooter;

  if(path === "/mall/login" || path === "/mall/welcome" ||
  path === '/' || path === "/life/welcome" || path === "life/login" ) displayFooter = "";
  else displayFooter = footer


  return (
    <>
    {displayFooter}
    </>
  )
}

export default withRouter(MyFooter)
