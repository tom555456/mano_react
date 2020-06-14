import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom";

function Cart(props) {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])

  useEffect(() => {
    const initCart = localStorage.getItem('cart') || '[]'
    setMycart(JSON.parse(initCart))

  }, [])


  useEffect(() => {
    let newMycartDisplay = []


    for (let i = 0; i < mycart.length; i++) {
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )

      if (index !== -1) {
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  // 計算總價用的函式
  function sum(items) {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }

    const display = (
    <>
    
      {mycartDisplay.map(value => ( 
                  <Container className="mt-0 m-3">
                      <Row>
                          <Col xs={2}>
                              <Image
                              width={64}
                              height={64}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={9} className="d-flex align-items-center">
                              <p className="w-25">{value.name}</p>
                              <p className="w-25 text-right">${value.price}</p>
                              <p className="w-25 text-right">{value.amount}</p>
                              <p className="w-25 text-right">${value.price * value.amount}</p>
                          </Col>
                      </Row>
                  </Container>
            ))}

                <Row>
                  <Col xs={11} className="d-flex align-items-center justify-content-between m-4">
                    <p>寄送資訊：</p>
                    <p>訂購人</p>
                    <p>訂購人電話</p>
                    <p>配送地址</p>
                    <Button className="mt-2 mb-2" size="sm" variant="outline-primary" onClick={() => props.history.push("/cart/comfirm/change")}>變更</Button>
                    <p>運費：$</p>
                  </Col>
                </Row>
           

        
        
            <Row className="d-flex">
                <Col xs={5} className="item-content-left m-4 pt-4">
                    <h5 className="item-name">折扣碼：</h5>
                </Col>
                <Col xs={6} className="d-flex fd-col text-right p-5">
                    <p className="">商品總金額：${sum(mycartDisplay)}</p>
                    <p className="">折扣金額：${props.itemPrice}</p>
                    <p className="">折扣後總金額：${sum(mycartDisplay)}</p>
                </Col>
            </Row>

     

      
    </>
  )

  return (
    <>
    <Container>
          {display}
        <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => props.history.push("/cart/payment")}>確認付款</Button>
        </Row>
    </Container>
    </>
  )
}

export default withRouter(Cart)