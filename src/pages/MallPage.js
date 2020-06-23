import Masonry from 'react-masonry-css'
import React, { useState, useEffect } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import '../styles/MallHomePage.css'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'

function MallPage(props) {
  const [malldata, setMalldata] = useState([])
  const [isshow,setIsshow] = useState(21)
  const  catIds = 1

  function changeBackgroundColorWhite() {
    document.body.style.background = '#FFFFFF'
  }

  async function getData() {
    const request = new Request(`http://localhost:3002/mallpagehome/`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setMalldata(data)
  }
  useEffect(() => {
    changeBackgroundColorWhite()
    getData()
  }, [])

  return (
    <>
    <div className="logoarea">
        <div  className="biglogo" >
        <img style={{width:"220px"}}src="/mano_logo_dark-01.svg" />
        </div>
        <div  className="biglogo" >
        <img style={{width:"220px"}}src="/mano_logo_onlyNO.svg" />
        </div>
     </div>

      <div className="card-field d-flex flex-wrap justify-content-between">

      {malldata.map((value,index)=>{
          return(
              <>
        <a href={`http://localhost:3000/mall/itemDetail/shop/categoryId=1?itemId=${value.itemId}`}><div key={index}className="card-square" onMouseEnter={()=>{setIsshow(index)}} onMouseLeave={()=>{setIsshow(21)}}>
          {isshow===index?
        ( <div className="whitebox"></div>):""}
        
          <img className="card-img" src={`items/${value.itemImg}`} />
          {isshow===index?(
          <div className="card-show">
            <p className="card-title ">{value.itemName}</p>
            <div className="card-price d-flex justify-content-between align-items-end">
              <span>網路價</span>
              <span className="price-number">${value.itemPrice}</span>
            </div>
          </div>):""}
        </div></a>
        </>
        )
        })} 
        
        
        
        
      </div>
    </>
  )
}

export default withRouter(MallPage)