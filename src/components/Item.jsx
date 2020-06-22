import React from 'react'
import { withRouter } from 'react-router-dom'

import {
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Media,
  Button,
} from 'react-bootstrap'

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
    <div className="item-card" value={props.itemId}>
      <div
        className="item-img"
        onClick={() =>
          props.history.push(
            `/mall/itemDetail${props.linkUrl}/categoryId=${props.categoryId}?itemId=${props.itemId}`
          )
        }
      >
        <img
          src={`/items/${props.itemImg}`}
          alt={props.itemImg}
          value={props.itemId}
        />
        <div className="learnMore">ディテール</div>
      </div>
      <div className="item-content">
        <div className="item-content-left">
          <h3 className="item-name">{props.itemName}</h3>
          <p className="item-description">{props.itemDescription}</p>
        </div>
        <div className="item-content-right">
          <h3 className="item-price">$ {props.itemPrice}</h3>
          <button className="add-cart" onClick={props.handleClick}>
            add to cart
          </button>
          <button className="add-fav" onClick={props.handleWishListClick}>
            add to favtorite
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Item)
