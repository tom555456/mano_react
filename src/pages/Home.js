import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import Slider from './Slider'
import AOS from 'aos'
import '../styles/aos-master/dist/aos.css'

function Home(props) {
  AOS.init()
  return (
    <>
      <div className="firstPage d-flex">
        <div className="bgLeft">
          <div className="oval"></div>
        </div>
        <div className="bgRight">
          <div
            className="aLink"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <a href="#thirdPage">
              <h5>SERVICE</h5>
            </a>
            <a href="#secondPage">
              <h5>ABOUT US</h5>
            </a>
            <a href="#fourthPage">
              <h5>CONTACT</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="secondPage" id="secondPage">
        <div className="line"></div>
        <h3>品牌故事About Us</h3>
        <div
          className="description2"
          data-aos="fade-up-right"
          data-aos-duration="800"
        >
          <h4>抹上質感，療癒人生</h4>
          <p>
            綠色有很多，抹茶是天生帶有質感的一種。
            你可以從這裡帶走的有很多，向右融入社群，向左進入商城。或許只是看看，也對眼睛有益。
          </p>
        </div>
        <div
          className="brandPic"
          data-aos="zoom-out-right"
          data-aos-duration="800"
        ></div>
        <div
          className="description1"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
        >
          <h4>發現您與生活的一期一會</h4>
          <div className="dec">
            Mano以抹茶為品牌形象，獻上珍選商品。每一個與產品對上眼的瞬間，都是屬於您
            與生活的一期一會。
          </div>
        </div>

        <div
          data-aos="flip-left"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          className="moreBtn"
        >
          <a href="/about" className="more">
            MORE→
          </a>
        </div>
      </div>
      <div className="thirdPage" id="thirdPage">
        <Slider />
      </div>
      <div className="fourthPage" id="fourthPage">
        <h3>Contact Us</h3>
        <div className="brandPic2"></div>
        <div className="transparentbox"></div>
        <div className="inputbox">
          <input
            type="text"
            placeholder="Your email address"
            style={{
              position: 'relative',
              left: '68px',
              top: '56px',
              width: '293px',
              height: '40px',
            }}
          />
          <input
            type="text"
            placeholder="Something to tell us..."
            style={{
              position: 'relative',
              left: '68px',
              top: '90px',
              width: '481px',
              height: '40px',
            }}
          />
          <button name="" id="" className="btn btn-ipb" value="SEND NOW">
            SEND NOW <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="contactinfo">
          <p className="ctitle"> Contact info</p>
          <p>Email : mano@mano.com.tw</p>
          <p>TEL:02-6618-1818</p>
        </div>
      </div>
      <div className="fifthPage d-flex flex-column align-items-center">
        <p>Mano is our life style. It can be yours.</p>
        <div className="footline "></div>
        <div className="buttonarea d-flex justify-content-between">
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter-square"></i>
        </div>
        <span>2020 MANO COPYRIGHT</span>
      </div>
    </>
  )
}

export default withRouter(Home)
