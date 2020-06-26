import Masonry from 'react-masonry-css'
import React, { useState, useEffect } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import './LifePage.css'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

function LifePage(props) {
  function changeBackgroundColorWhite() {
    document.body.style.background = '#FFFFFF'
  }

  useEffect(() => {
    changeBackgroundColorWhite()
  }, [])

  //   var items = [
  //     { id: 1, name: 'My First Item', courseImg: '/courses/CS008-2.jpg' },
  //     { id: 2, name: 'Another item', courseImg: '/courses/CS011-1.jpg' },
  //     { id: 3, name: 'Third Item', courseImg: '/courses/CS013-3.jpg' },
  //     { id: 4, name: 'Here is the Fourth', courseImg: '/courses/CS005-1.jpg' },
  //     { id: 5, name: 'High Five', courseImg: '/courses/CS016-2.jpg' },
  //   ]

  //   // Convert array to JSX items
  //   items = items.map(function (item) {
  //     return (
  //       <div className="wrap" key={item.id}>
  //         <img className="img" src={item.courseImg}></img>
  //         {item.name}
  //       </div>
  //     )
  //   })

  const lindaoriginal = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-container"
    >
      <div className="outter left">
        <div className="flex">
          <div className="column a">
            <img className="img-life" src="/courses/CS013-3.jpg" />
            <Button className="btn-life" onClick={()=> props.history.push("/life/comment") }>留言板--></Button>
          </div>
          <div className="column a">
            <img
              className="img-life"
              src="https://cdn.pixabay.com/photo/2018/10/08/21/22/bank-3733501__340.jpg"
            />
            <Button className="btn-life"  onClick={()=> props.history.push("/life/map") }>抹茶地圖--></Button>
          </div>
        </div>
        <a href="/course">
          <div className="column">
            <img className="img-life" src="/courses/CS008-2.jpg" />
            <Button className="btn-life"  onClick={()=> props.history.push("/life/course") }>達人推薦--></Button>
          </div>
        </a>
      </div>

      <div className="outter right">
        <a href="/course">
          <div className="column">
            <img className="img-life" src="/courses/CS005-1.jpg" />
            <Button className="btn-life"  onClick={()=> props.history.push("/life/course") }>手作課程--></Button>
          </div>
        </a>
        <div className="flex">
          <div className="column a">
            <img
              className="img-life"
              src="https://cdn.pixabay.com/photo/2015/07/16/16/42/sweets-847918__340.jpg"
            />
            <Button className="btn-life"  onClick={()=> props.history.push("/life/course") }>熱門商品--></Button>
          </div>
          <div className="column a">
            <img className="img-life" src="/courses/CS009-4.jpg" />
            <Button className="btn-life"  onClick={()=> props.history.push("/life/marketing") }>會員限定--></Button>
          </div>
        </div>
      </div>
    </Masonry>
  )

  return (
    <>

      <div className="big-field d-flex">
      <h3>Find your friends and lifestyle here</h3>
      </div>
      <div className="big-field d-flex">
        <div className="card-field d-flex flex-wrap">
          <div className="card-horizon">
            <img className="c-h-img" src="/courses/CS013-3.jpg" />
            <button type="button" className="btn btn-primary c-h-button" onClick={()=> props.history.push("/life/comment")}>
              留言板 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="card-vertical">
            <img className="c-v-img" src="https://cdn.pixabay.com/photo/2018/10/08/21/22/bank-3733501__340.jpg" />
            <button type="button" className="btn btn-primary c-v-button" onClick={()=> props.history.push("/life/map") }>
            抹茶地圖 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="card-vertical">
            <img className="c-v-img" src="/courses/CS008-2.jpg" />
            <button type="button" className="btn btn-primary c-v-button" onClick={()=> props.history.push("/life/course") }>
            達人推薦 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="card-field d-flex flex-wrap">
          <div className="card-vertical">
            <img className="c-v-img" src="/courses/CS005-1.jpg" />
            <button type="button" className="btn btn-primary c-v-button" onClick={()=> props.history.push("/life/course") }>
            手作課程 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="card-vertical">
            <img className="c-v-img" src="https://cdn.pixabay.com/photo/2015/07/16/16/42/sweets-847918__340.jpg" />
            <button type="button" className="btn btn-primary c-v-button" onClick={()=> props.history.push("/life/course") }>
            熱門商品 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="card-horizon">
            <img className="c-h-img" src="/courses/CS009-4.jpg" />
            <button type="button" className="btn btn-primary c-h-button" onClick={()=> props.history.push("/life/marketing") }>
            會員限定 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        </div>
        <Container >
        {/* {lindaoriginal} */}

      </Container>
    </>
  )
}

export default withRouter(LifePage)
