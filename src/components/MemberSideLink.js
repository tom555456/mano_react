import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"

function MemberSideLink(props) {
  return (
    <>   
      <Container>
        <Row>
          <Col md={2}>
            <ListGroup variant="flush">
              <ListGroup.Item action href="/membercenter">
                會員資料
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                我的訂單
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                折價券
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
                我的追蹤
              </ListGroup.Item>
            </ListGroup>
          </Col> 
          {props.children}
        </Row>
      </Container>
    </>
  )
}
export default MemberSideLink
