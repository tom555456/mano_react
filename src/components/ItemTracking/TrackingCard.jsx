import React from "react";
import { Table, Card, Container, Row, Col, ListGroup, Image, Media, Button } from 'react-bootstrap'
import Heart from "./Heart"
import "./trackingCard.css"

// xs={6} md={4}  style={{ flexGrow: '3'}}
const TrackingCard = props => {

    return (
        <>
            <div className="track-card">
                
                    <img className="track-photo" style={{ width: '198px', height: '250px', overflow: 'hidden' }} variant="top" src={`/items/${props.itemImg}`}
                        alt={props.itemImg} />
                <div className="heart-position">
                   <Heart
                        className=""
                        itemId={props.itemId}
                        username={props.username}
                        itemPrice={props.itemPrice} /> 
                
                </div>
                <div className="track-card-body">
                    <h5 className="trackingCard-item-name">
                        {props.itemName}
                    </h5>
                    <div className="d-flex">
                     <h5 className="trackingCard-item-price">${props.itemPrice}</h5>
                    <Button
                        variant="btn btn-outline-success"
                        onClick={props.handleClick}
                        style={{
                            marginLeft: '45px',
                            padding: '1px',
                            backgroundcolor: '#5C6447',
                        }}>
                        add to cart
                    </Button>   
                    </div>
                    
                </div>

            </div>
        </>


    )
}

export default TrackingCard;