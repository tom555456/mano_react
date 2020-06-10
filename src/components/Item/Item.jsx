import React from "react";
import "./item-style.css";

const Item = props => {


        return(
                <div className="item-card">
                <div className="item-img"><img src={`/items/${props.itemImg}`} alt={props.itemImg}/></div>
                    <div className="item-content">
                        <div className="item-content-left">
                            <h3 className="item-name">{props.itemName}</h3>
                            <p className="item-description">{props.itemDescription}</p>
                        </div>
                        <div className="item-content-right">
                            <h3 className="item-price">$ {props.itemPrice}</h3>
                            <button className="add-cart" onClick={props.handleClick}>add to cart</button>
                            <button className="add-fav">add to favtorite</button>
                        </div>
                    </div>
                </div>
            )
}

export default Item;