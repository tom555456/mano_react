import React from 'react'
import { withRouter } from 'react-router-dom'

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
<<<<<<< HEAD
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
=======
    <>
      <div className="container mb-2 outside">
        <div className="img">
          <a
            href={`/mall/itemDetail${props.linkUrl}/categoryId=${props.categoryId}?itemId=${props.itemId}`}
          >
            <img
              src={`/items/${props.itemImg}`}
              alt={props.itemImg}
              style={{ height: '250px', width: '250px' }}
              className="item-pic"
            />
          </a>
        </div>
>>>>>>> 92811bc537ce72ec8602c53baf1644e0b69ffc18

        <div className="item-desc">
          <div className="title-desc">
            <h2 className="name">{props.itemName}</h2>
            商品介紹 : {props.itemDescription}
          </div>
          <div className="item-price">$ {props.itemPrice}</div>
          <div className="add-btn">
            <button
              className="item-add-cart cardLink btn-left"
              onClick={props.handleClick}
            >
              add to cart
              <i class="fas fa-shopping-cart" style={{ marginLeft: '8px' }}></i>
            </button>
            <button
              className="add-fav cardLink"
              onClick={props.handleWishListClick}
            >
              add to favtorite
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Item)
