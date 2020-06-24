import React, { useState, useEffect } from 'react'

import './course-style.css'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

import { withRouter } from 'react-router-dom'

function Course(props) {
  return (
    <Container className="container mb-2">
      <Row>
        <Col xs={12} md={4} className="d-flex">
          <div className="item-img">
            <a
              href={`/life/courseDetail${props.linkUrl}?courseId=${props.courseId}`}
            >
              <img
                thumbnail
                style={{ width: '200px', height: '200px' }}
                // onClick={() =>
                //   props.history
                //     .push
                //     `/life/courseDetail${props.linkUrl}?courseId=${props.courseId}`
                //     ()
                // }
                src={`/courses/${props.courseImg}`}
                alt={props.courseImg}
                onMouseOver={(e) =>
                  (e.currentTarget.src = `/courses/${props.courseImg2}`)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src = `/courses/${props.courseImg}`)
                }
              />
            </a>
            <div className="learnMore">どうぞ</div>
          </div>
          <div className="ml-2">
            <Card
              style={{ width: '35rem', height: '200px', marginLeft: '135px' }}
            >
              <Card.Body>
                <Card.Title>
                  <h2>{props.courseName}</h2>
                </Card.Title>
                <Card.Subtitle
                  className="mt-1 d-flex"
                  style={{ width: '70%', color: '#C0C0C0' }}
                >
                  課程簡介 : {props.courseDesc}
                </Card.Subtitle>

                <Card.Subtitle
                  className="mb-1 mt-4 d-flex"
                  style={{ color: '#C0C0C0' }}
                >
                  人數上限：{props.courseQty}
                </Card.Subtitle>

                <div>
                  <Card.Text className="item-price text-right cardText2">
                    $ {props.coursePrice}
                  </Card.Text>

                  <Card.Link>
                    <button
                      className="add-cart cardLink"
                      onClick={props.handleClick}
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                      }}
                    >
                      add to cart
                      <i
                        class="fas fa-shopping-cart"
                        style={{ marginLeft: '8px' }}
                      ></i>
                    </button>
                  </Card.Link>

                  {/* <Card.Link>
                    <button
                      className="add-fav cardLink"
                      onClick={props.handleWishListClick}
                    >
                      add to favtorite
                    </button>
                  </Card.Link> */}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>

    // <div className="item-card" value={props.courseId}>
    //   <div
    //     className="item-img"
    //     onClick={() =>
    //       props.history.push(
    //         `/life/courseDetail${props.linkUrl}?courseId=${props.courseId}`
    //       )
    //     }
    //   >
    //     <img
    //       src={`/courses/${props.courseImg}`}
    //       alt={props.courseImg}
    //       value={props.courseId}
    //       onMouseOver={(e) =>
    //         (e.currentTarget.src = `/courses/${props.courseImg2}`)
    //       }
    //       onMouseOut={(e) =>
    //         (e.currentTarget.src = `/courses/${props.courseImg}`)
    //       }
    //     />
    //     <div className="learnMore">どうぞ</div>
    //   </div>
    //   <div className="item-content">
    //     <div className="item-content-left">
    //       <h3 className="item-name">{props.courseName}</h3>
    //       <p className="item-description">{props.courseDesc}</p>
    //       <p className="item-qty">人數上限：{props.courseQty}</p>
    //     </div>
    //     <div className="item-content-right">
    //       <h3 className="item-price">$ {props.coursePrice}</h3>
    //       <button className="add-cart" onClick={props.handleClick}>
    //         add to cart
    //       </button>
    //       <button className="add-fav">add to favtorite</button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default withRouter(Course)
