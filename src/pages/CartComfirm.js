import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md"

function Cart(props) {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [member, setMember] = useState("")

  async function getData() {
    const request = new Request("http://localhost:3002/membercenter/list", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setMember(data[0])
  }
  

  useEffect(() => {

    getData()
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


  function sumShipping(items) {
    let shipColdMoney = 0;
    let coldItemTotal = 0;
    let shipRoomMoney = 0;
    let roomItemTotal = 0;
    let shipMoney = 0;
    let shiptotalMoney = 0;

    //計算個別單獨運費
    for (let i = 0; i < items.length; i++) {
        if (items[i].shippingId == 'S001') {
            shipColdMoney += 150;
            coldItemTotal += items[i].price * items[i].amount;
        } else if (items[i].shippingId == 'S002') {
            shipRoomMoney += 100;
            roomItemTotal += items[i].price * items[i].amount;
        } else {
            shipMoney += 0;
        };
    };
    //避免運費重複計算
    if (shipColdMoney > 150) {
        shipColdMoney = 150;
    };
    if (shipRoomMoney > 100) {
        shipRoomMoney = 100;
    };
    //設定滿額免運
    if (coldItemTotal > 1199) {
        shipColdMoney -= 150;
    };
    if (roomItemTotal > 799) {
        shipRoomMoney -= 100;
    };
    //計算運費總額
    shiptotalMoney += shipColdMoney;
    shiptotalMoney += shipRoomMoney;
    shiptotalMoney += shipMoney;
    //先把訂單總金額加上運費=(0+運費)
    return shiptotalMoney

  }

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
                  <Container className="mb-3">
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
                          <Col xs={10} className="d-flex align-items-center">
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
                    <p><MdLocalShipping className="font-48 mr-1"/>寄送資訊：宅配</p>
                    <p>{member.memberName}</p>
                    <p>{member.phone}</p>
                    <p>{member.shipAddress}</p>
                    <Button className="mt-2 mb-2" size="sm" variant="outline-primary" onClick={() => props.history.push("/cart/comfirm/change")}>變更</Button>
                    <p>運費：${sumShipping(mycartDisplay)}</p>
                  </Col>
                </Row>
           

        
        
            <Row className="d-flex">
                <Col xs={5} className="item-content-left m-4 pt-4">
                    <h5 className="item-name">折扣碼：</h5>
                </Col>
                <Col xs={6} className="d-flex fd-col text-right p-5">
                    <p className="">商品總金額：${sum(mycartDisplay)}</p>
                    <p className="">折扣金額：${props.itemPrice}</p>
                    <p className="">折扣後總金額：${sum(mycartDisplay) + sumShipping(mycartDisplay)}</p>
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