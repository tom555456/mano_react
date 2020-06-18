import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, Image, Button } from "react-bootstrap"
import { withRouter, Link } from "react-router-dom";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";
import { FaUndo } from "react-icons/fa"
import { BsFillPlayFill } from "react-icons/bs"

function Cart (props) {

  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])

  const [myCourseCart, setMyCourseCart] = useState([])
  const [myCourseCartDisplay, setMyCourseCartDisplay] = useState([])
  const [member, setMember] = useState([])


  useEffect(() => {
    const initCart = localStorage.getItem('cart') || '[]'
    const cartJson = JSON.parse(initCart)
    const initCourseCart = localStorage.getItem('coursecart') || '[]'
    const courseCartJson = JSON.parse(initCourseCart)
    const member = JSON.parse(localStorage.getItem('member')) || [{ memberName: '' }]

    setMycart(cartJson)
    setMyCourseCart(courseCartJson)
    setMember(member)

  }, [])


  useEffect(() => {
    let newMycartDisplay = []

    console.log('mycart', mycart)

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

    console.log('newMycartDisplay', newMycartDisplay)
    setMycartDisplay(newMycartDisplay)

  }, [mycart])

  useEffect(() => {
    let newMyCourseCartDisplay = []

    for (let i = 0; i < myCourseCart.length; i++) {
      const index = newMyCourseCartDisplay.findIndex(
        (value) => value.id === myCourseCart[i].id
      )

      if (index !== -1) {
        newMyCourseCartDisplay[index].amount += myCourseCart[i].amount
      } else {
        const newCourseItem = { ...myCourseCart[i] }
        newMyCourseCartDisplay = [...newMyCourseCartDisplay, newCourseItem]
      }
    }

    setMyCourseCartDisplay(newMyCourseCartDisplay)

  },[myCourseCart])



  function updateCartToLocalStorage (value) {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))

    setMycart(newCart);
  }

  function updateCourseCartToLocalStorage (value) {
    const currentCart = JSON.parse(localStorage.getItem('coursecart')) || []

    const newCart = [...currentCart, value]
    localStorage.setItem('coursecart', JSON.stringify(newCart))

    setMyCourseCart(newCart);
  }


  function substarctCartToLocalStorage (value) {
    
    let foundObj = mycart.find(obj => obj.name === value.name)
    let filtered = mycart.filter(el => el != foundObj);
    const newCart = filtered
    localStorage.setItem('cart', JSON.stringify(newCart))

    setMycart(newCart);
  }

  function substarctCourseCartToLocalStorage (value) {
    
    let foundObj = myCourseCart.find(obj => obj.name === value.name)
    let filtered = myCourseCart.filter(el => el != foundObj);
    const newCart = filtered
    localStorage.setItem('coursecart', JSON.stringify(newCart))

    setMyCourseCart(newCart);
  }



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



  return (
    <> 
    <div className="w-75 d-flex justify-content-end">
        <Link to="/shop" onClick={() => localStorage.setItem("page",1)}>繼續購物 <FaUndo/></Link>
    </div>
    {mycartDisplay.length > 0 ? (
    <Container>
    <h5><BsFillPlayFill />購買的商品</h5>
      <Row>
          <Col sm={9} className="d-flex fd-col">
          <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">商品</th>
                        <th></th>
                        <th>價格</th>
                        <th>數量</th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>
          {mycartDisplay.map(value => ( 
                  <Container className="mt-0 m-3">
                      <Row>
                          <Col xs={3}>
                              <Image
                              width={100}
                              height={100}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={8}>
                              <Row className="d-flex">
                                  <p className="w-25">{value.name}</p>
                                  <p className="w-25 text-right">${value.price}</p>
                                  <p className="w-25 text-right">
                                    <GrFormSubtract onClick={() => substarctCartToLocalStorage({
                                        id: value.id,
                                        img: value.img,
                                        name: value.name,
                                        amount: 1,
                                        price: value.price,
                                        shippingId: value.shippingId
                                      }) }/>
                                      {" "}
                                      {value.amount}
                                      {" "}
                                    <GrFormAdd  onClick={() => updateCartToLocalStorage({
                                        id: value.id,
                                        img: value.img,
                                        name: value.name,
                                        amount: 1,
                                        price: value.price,
                                        shippingId: value.shippingId
                                      }) } />
                                  </p>
                                  <p className="w-25 text-right">${value.price * value.amount}</p>
                              </Row>
                              <Row className="mt-2">
                                  <Button className="mt-2 mb-2" size="sm" variant="primary">優惠活動</Button>
                              </Row>
                          </Col>
                      </Row>
                  </Container>
            ))}
            </Col>

            <Col sm={3} className="d-flex fd-col p-3 pl-5">
                  <Table>
                    <thead>
                      <tr>
                        <th>總計</th>
                      </tr>
                    </thead>
                  </Table>
              <h6>商品總金額</h6>
              <h5>小計  ${sum(mycartDisplay)}</h5>
              <h5>運費  ${sumShipping(mycartDisplay)}</h5>
              <hr className="mt-5" />
              <h5>總金額  ${sum(mycartDisplay) + sumShipping(mycartDisplay)}</h5>
            </Col>
          </Row>
        </Container> ) : ""}

        {myCourseCartDisplay.length > 0 ? (
    <Container>
    <h5><BsFillPlayFill />購買的課程</h5>
      <Row>
          <Col sm={9} className="d-flex fd-col">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">課程</th>
                        <th></th>
                        <th>價格</th>
                        <th>數量</th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>
          {myCourseCartDisplay.map(value => ( 
                  <Container className="mt-0 m-3">
                      <Row>
                          <Col xs={3}>
                              <Image
                              width={100}
                              height={100}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={8}>
                              <Row className="d-flex">
                                  <p className="w-25">{value.name}</p>
                                  <p className="w-25 text-right">${value.price}</p>
                                  <p className="w-25 text-right">
                                    <GrFormSubtract onClick={() => substarctCourseCartToLocalStorage({
                                        id: value.id,
                                        img: value.img,
                                        name: value.name,
                                        amount: 1,
                                        price: value.price
                                      }) }/>
                                      {" "}
                                      {value.amount}
                                      {" "}
                                    <GrFormAdd  onClick={() => updateCourseCartToLocalStorage({
                                        id: value.id,
                                        img: value.img,
                                        name: value.name,
                                        amount: 1,
                                        price: value.price
                                      }) } />
                                  </p>
                                  <p className="w-25 text-right">${value.price * value.amount}</p>
                              </Row>
                              <Row className="mt-2">
                                  <Button className="mt-2 mb-2" size="sm" variant="primary">優惠活動</Button>
                              </Row>
                          </Col>
                      </Row>
                  </Container>
            ))}
            </Col>

            <Col sm={3} className="d-flex fd-col p-3 pl-5">
                  <Table>
                    <thead>
                      <tr>
                        <th>總計</th>
                      </tr>
                    </thead>
                  </Table>
              <h6>課程總金額</h6>
              <h5>小計  ${sum(myCourseCartDisplay)}</h5>
              <hr className="mt-5" />
              <h5>總金額  ${sum(myCourseCartDisplay)}</h5>
            </Col>
          </Row>
        </Container> ) : "" }

        {mycartDisplay.length <= 0 && myCourseCartDisplay.length <= 0 ? (
          <div className="d-flex justify-content-center">
              <h2 className="mt-3 mb-3">購物車沒有東西</h2>
          </div>
        ) : "" }

       {mycartDisplay.length > 0 || myCourseCartDisplay.length > 0 ? (
          <Container>
            <Row className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary" 
                    onClick={() => {
                      if(member[0].memberName === "") {
                        props.history.push("/login")
                      }else {
                        localStorage.setItem("finalCart", JSON.stringify(mycartDisplay))
                        localStorage.setItem("finalCourseCart", JSON.stringify(myCourseCartDisplay))
                        localStorage.setItem("shipTotal", sumShipping(mycartDisplay))
                        localStorage.setItem("shopTotal", sum(mycartDisplay) + sumShipping(mycartDisplay))
                        localStorage.setItem("courseTotal", sum(myCourseCartDisplay))
                        props.history.push("/cart/comfirm")
                      }
                  }}>去買單</Button>
              </Row> 
          </Container>

       ) : ""}   


    </>
  )
}

export default withRouter(Cart)
