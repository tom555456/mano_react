import React from 'react'
import { withRouter } from 'react-router-dom'

import {
  Table,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Media,
  Button,
} from 'react-bootstrap'
import './Item/item-style.css'

function Item(props) {
  const {
    itemId,
    itemImg,
    itemName,
    itemDescription,
    itemPrice,
    handleClick,
    getDetail,
    linkUrl,
    categoryId,
  } = props
  // console.log(props)

  return (
    <Container className="container mb-2">
      <Row>
        <Col xs={12} md={4} className="d-flex">
          <Image
            onClick={() =>
              props.history.push(
                `/mall/itemDetail${props.linkUrl}/categoryId=${props.categoryId}?itemId=${props.itemId}`
              )
            }
            src={`/items/${props.itemImg}`}
            thumbnail
            style={{ height: '200px', width: '200px' }}
          />

          <div className="ml-2">
            <Card style={{ width: '35rem', height: '200px' }}>
              <Card.Body>
                <Card.Title>
                  <h2>{props.itemName}</h2>
                </Card.Title>
                <Card.Subtitle className="mb-2 mt-2 text-muted d-flex">
                  商品介紹 : {props.itemDescription}
                </Card.Subtitle>
                <div>
                  <Card.Text className="item-price text-right cardText2">
                    $ {props.itemPrice}
                  </Card.Text>

                  <Card.Link>
                    <button
                      className="add-cart cardLink"
                      onClick={props.handleClick}
                    >
                      add to cart
                      <i
                        class="fas fa-shopping-cart"
                        style={{ marginLeft: '8px' }}
                      ></i>
                    </button>
                  </Card.Link>
                  <Card.Link>
                    <button
                      className="add-fav cardLink"
                      onClick={props.handleWishListClick}
                    >
                      add to favtorite
                    </button>
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* <div
        className="item-content"
        value={props.itemId}
        style={{
          background: 'white',
          border: '1px solid white',
          marginBottom: '5px',
          justifyContent: 'center',
        }}
      >
        <div className="item-img">
          <img
            src={`/items/${props.itemImg}`}
            alt={props.itemImg}
            value={props.itemId}
            style={{ width: '100%', height: '150%' }}
          />
          <div className="learnMore">ディテール</div>
        </div>
        <div className="item-content">
          <div className="item-content-left"> */}
          {/* <h3 className="item-name">{props.itemName}</h3> */}
          {/* <p className="item-description">{props.itemDescription}</p> */}
          {/* </div>
          <div className="item-content-right"> */}
          {/* <h3 className="item-price">$ {props.itemPrice}</h3> */}
          {/* <button className="add-cart" onClick={props.handleClick}>
              add to cart
              <i class="fas fa-shopping-cart" style={{ marginLeft: '8px' }}></i>
            </button> */}
          {/* <button className="add-fav" onClick={props.handleWishListClick}>
              add to favtorite
            </button> */}
          {/* </div>
        </div>
      </div> */}
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(Item)