import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import Slider from './Slider'


function Home(props) {
  return (
    <>
      <div className="firstPage d-flex">
        <div className="bgLeft">
          <div className="oval"></div>
        </div>
        <div className="bgRight">
          <div className="aLink">
            <a href="">
              <h5>SERVICE</h5>
            </a>
            <a href="">
              <h5>ABOUT US</h5>
            </a>
            <a href="">
              <h5>CONTACT</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="secondPage">
        <div className="story">
          <h3>
            ——————品&nbsp;牌&nbsp;故&nbsp;事&nbsp;A&nbsp;b&nbsp;o&nbsp;u&nbsp;t&nbsp;&nbsp;&nbsp;U&nbsp;s
          </h3>
          <div className="brandPic"></div>
        </div>
        <div className="description1">
          <h4>發現您與生活的一期一會</h4>
          <h6>
            Mano以抹茶為品牌形象，獻上珍選商品。
            每一個與產品對上眼的瞬間，都是屬於您 與生活的一期一會。
          </h6>
        </div>
        <div className="description2">
          <h4>抹上質感，療癒人生</h4>
          <h6>
            綠色有很多，抹茶是天生帶有質感的一種。
            你可以從這裡帶走的有很多，向右融入社群，向左進入商城。或許只是看看，也對眼睛有益。
          </h6>
        </div>
        <div className="moreBtn">
          <a href="" className="more">
            MORE→
          </a>
        </div>
      </div>
      <div className="thirdPage">
        <Slider />
      </div>
      <div className="fourthPage"></div>
    </>
  )
}

export default withRouter(Home)
