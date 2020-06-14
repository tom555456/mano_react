import React, { useState, useEffect } from 'react'
import './course-style.css'

const Course = (props) => {
  return (
    <div className="item-card">
      <div className="item-img">
        <img
          src={`/courses/${props.courseImg}`}
          alt={props.courseImg}
          onMouseOver={(e) =>
            (e.currentTarget.src = `/courses/${props.courseImg2}`)
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = `/courses/${props.courseImg}`)
          }
        />
        <div className="learnMore">どうぞ</div>
      </div>
      <div className="item-content">
        <div className="item-content-left">
          <h3 className="item-name">{props.courseName}</h3>
          <p className="item-description">{props.courseDesc}</p>
          <p className="item-qty">人數上限：{props.courseQty}</p>
        </div>
        <div className="item-content-right">
          <h3 className="item-price">$ {props.coursePrice}</h3>
          <button className="add-cart" onClick={props.handleClick}>
            add to cart
          </button>
          <button className="add-fav">add to favtorite</button>
        </div>
      </div>
    </div>
  )
}

export default Course
