import React from "react";
import { Table, Container, Row, Col, ListGroup, Image, Media, Button } from "react-bootstrap"


const Item = props => {


        return(
            <>
                <Container className="mt-0 m-3">
                    <Row>
                        <Col xs={3}>
                            <Image
                            width={150}
                            height={150}
                            className="mr-3"
                            src={`/items/${props.itemImg}`}
                            alt={props.itemImg}
                            />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col xs={8}>
                                    <h5>{props.itemName}</h5>
                                    <p>{props.itemDescription}</p>
                                </Col>
                                <Col xs={4} className="fd-col">
                                    <h3>${props.itemPrice}</h3>
                                    <Button className="mt-2 mb-2" size="sm" variant="primary" onClick={props.handleClick}>add to cart</Button>
                                    <Button variant="outline-dark" size="sm" >add to favtorite</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </>

            )
}

export default Item;