import React, { Component, Fragment, useState, useEffect } from "react";
import { Table, Container, Alert, Button, Form, Figure } from "react-bootstrap"

import { withRouter } from "react-router-dom";



function CartPayment (props) {
    const [order, setOrder] = useState("")
    const [orderList, setOrderList] = useState("")
    const [orderPayment, setOrderPayment] = useState("")

    const [name, setName] = useState("")
    const [card, setCard] = useState("")
    const [closingDate, setClosingDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [address, setAddress] = useState("")
    const [orderErrors, setOrderErrors] = useState([])

    const [courseDiscountUpdate, setCourseDiscountUpdate] = useState("")
    const [shopDiscountUpdate, setShopDiscountUpdate] = useState("")

    const [paymentMethod, setPaymentMedthod] = useState("")


    useEffect(() => {
        props.changeBackgroundColorLight()

        const finalCart = JSON.parse(localStorage.getItem('finalCart'))
        const finalCourseCart = JSON.parse(localStorage.getItem('finalCourseCart'))

        const discount = localStorage.getItem("discount")
        const shipTotal = localStorage.getItem('shipTotal')
        const total = localStorage.getItem('total')
        const member = JSON.parse(localStorage.getItem('member'))
        const note = localStorage.getItem('note') || ""

        const relCourseCouponId = localStorage.getItem("relCourseCouponId")
        const relShopCouponId = localStorage.getItem("relShopCouponId")


        if(relCourseCouponId) setCourseDiscountUpdate({
          relCouponId: Number(relCourseCouponId),
        })

        if(relShopCouponId) setShopDiscountUpdate({
          relCouponId: Number(relShopCouponId)
        })

        
        setOrder({
            ...order,
            memberId: member[0].memberId,
            ship_name: member[0].memberName,
            orderPhone: member[0].phone,
            shipCity: member[0].paymentCity,
            shipDistrict: member[0].paymentDistrict,
            shipAddress: member[0].shipAddress,
            shiptotalMoney: Number(shipTotal),
            shopDiscount: Number(discount),
            totalPrice: Number(total),
            paymentStatus: "已付款",
            shipStatus: "未出貨",
            note: note
        })

        let newOrderList = []

        for(let i=0; i < finalCart.length; i++ ) {
          newOrderList.push({
              itemId: finalCart[i].id,
              checkPrice: finalCart[i].price,
              checkQuantity: finalCart[i].amount,
              checkSubtotal: finalCart[i].price * finalCart[i].amount
          })
        }

        for(let i=0; i < finalCourseCart.length; i++ ) {
          newOrderList.push({
              courseId: finalCourseCart[i].id,
              checkPrice: finalCourseCart[i].price,
              checkQuantity: finalCourseCart[i].amount,
              checkSubtotal: finalCourseCart[i].price * finalCourseCart[i].amount
          })
        }

        setOrderList(newOrderList)

      }, [])


      async function orderSuccessCallback() {
        console.log("callback")
        await insertOrderPaymentToSever(order, orderList, orderPayment)
        if(courseDiscountUpdate !== "") await updateDiscountToSever(courseDiscountUpdate)

      }

      function validate() {
        let errors = []
        let cardMatch = card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)
        let closingDateMatch = closingDate.match(/^[0-9]{2}\/[0-9]{2}$/)
        let cvvMatch = cvv.match(/^[0-9]{3}$/)

        if (name === "" || card === "" || closingDate === "" || cvv === "" || address ==="") {
          errors.push("您有尚未填寫的欄位")
        }

        if (name !== "" && card !== "" && closingDate !== "" && cvv !== "" && address !=="") {
            if (cardMatch === null) {
              errors.push("卡號格式有誤")
            } else {
              if (closingDateMatch === null) {
                errors.push("到期日格式有誤")
              } else {
                if (cvvMatch === null) {
                  errors.push("CVV格式有誤")
                }
              }
            }
        }

            if (errors.length > 0) {
              setOrderErrors(errors)
              return
            }
            setOrderErrors([])
            orderSuccessCallback()
      }
      
    
      async function updateDiscountToSever(item) {
        const request = new Request("http://localhost:3002/order/discountUse", {
          method: "PUT",
          body: JSON.stringify(item),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
    
        console.log("After JSON: ", JSON.stringify(item))
    
        const response = await fetch(request)
        const data = await response.json()
    
      }
    
    

      async function insertOrderPaymentToSever(item, item2, item3) {
        const request = new Request("http://localhost:3002/order/insertOrderPayment", {
          method: "POST",
          body: JSON.stringify({
            item: item,
            item2: item2,
            item3: item3
          }),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
    
        console.log("After JSON: ", JSON.stringify(item))
    
        const response = await fetch(request)
        const data = await response.json()
    
      }


    async function insertOrderToSever(item, item2) {
        const request = new Request("http://localhost:3002/order/insertOrder", {
          method: "POST",
          body: JSON.stringify({
            item: item,
            item2: item2
          }),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
    
        console.log("After JSON: ", JSON.stringify(item))
        console.log("After JSON: ", JSON.stringify(item2))
    
        const response = await fetch(request)
        const data = await response.json()

        console.log(data)

        // const id = data.results.insertId
        // await setInsertId(id)
      }

          
    return(
        <>
        <Container className="w-75 d-flex fd-col">
          <div className="d-flex justify-content-between">
          <Figure>
              <Figure.Image
                width={180}
                height={180}
                alt="貨到付款"
                src="/payment/貨到付款.png"
              />
              <Figure.Caption>
              貨到付款
              </Figure.Caption>
            </Figure>
            <Figure>
            <Figure.Image
                width={180}
                height={180}
                alt="ATM轉帳"
                src="/payment/ATM轉帳.png"
              />
              <Figure.Caption>
              ATM轉帳
              </Figure.Caption>
              </Figure>
              <Figure>
              <Figure.Image
                width={180}
                height={180}
                alt="linePay"
                src="/payment/linePay.png"
              />
              <Figure.Caption>
                Line Pay
              </Figure.Caption>
              </Figure>
              <Figure>
              <Figure.Image
                width={180}
                height={180}
                alt="信用卡"
                src="/payment/信用卡.png"
              />
              <Figure.Caption>
              信用卡
              </Figure.Caption>
              </Figure>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-5">
          <Form.Group className="text-center w-25" controlId="exampleForm.ControlSelect1">
            <Form.Label>選擇付款方式：</Form.Label>
            <Form.Control as="select" onChange={(event) => {
              console.log(event.target.value)
              setPaymentMedthod(event.target.value)
              if(event.target.value !== "信用卡") {
                  setOrder({
                  ...order,
                  paymentStatus: "未付款",
                  paymentMethod: event.target.value
                })
              }else {
                  setOrder({
                  ...order,
                  paymentMethod: event.target.value
                })
              }
              }}>
              <option>請選擇付款方式</option>
              <option value="ATM轉帳">ATM 轉帳</option>
              <option value="貨到付款">貨到付款</option>
              <option value="信用卡">信用卡</option>
              <option value="LinePay">LINE PAY</option>
            </Form.Control>
          </Form.Group>
          </div>
        </Container>

        <Container className="w-75">
          {paymentMethod === "信用卡" ? (
            <>
            <div className="text-center">
                <h3>付款資訊</h3>
            </div>

            {orderErrors.length > 0 ? (
              <> 
                {orderErrors.map((v, i) => (
                  <Alert className="d-flex justify-content-center mt-3" variant="danger" key={i}>
                    {v}
                  </Alert>
                ))}
              </>
            ) : ""}

            <Fragment>
                <div className="form-group">
                    <label htmlFor="example3">持卡人姓名：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           placeholder="請輸入姓名"
                           onChange={(event) => {
                             setName(event.target.value)
                             setOrderPayment({
                               ...orderPayment,
                               orderPaymentName: event.target.value
                           })}} />
                </div>
                <div className="form-group">
                    <label htmlFor="example3">卡號：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           placeholder="請輸入格式 xxxx-xxxx-xxxx-xxxx"
                           onChange={(event) => {
                                setCard(event.target.value)
                                setOrderPayment({
                                    ...orderPayment,
                                    orderPaymentCard: event.target.value
                                })}} />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="form-group">
                        <label htmlFor="example3">到期日：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                               placeholder="請輸入格式 xx/xx"
                               onChange={(event) => {
                                 setClosingDate(event.target.value)
                                 setOrderPayment({
                                    ...orderPayment,
                                    closingDate: event.target.value
                                })}} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="example3">CVV：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                                placeholder="請輸入格式 xxx"
                                onChange={(event) => {
                                  setCvv(event.target.value)
                                  setOrderPayment({
                                    ...orderPayment,
                                    cvv: event.target.value
                                })}} />
                    </div>
                    <div className="form-group w-50">
                        <label htmlFor="example3">帳單地址：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                            placeholder="請輸入帳單地址"
                            onChange={(event) => {
                              setAddress(event.target.value)
                              setOrderPayment({
                                ...orderPayment,
                                checkAddress: event.target.value
                            })}} />
                    </div>

                </div>
            </Fragment>
            
            <div className="d-flex justify-content-center pt-3 pb-3 mt-5">
                <Button className="mt-2 mb-2" variant="outline-primary"
                    onMouseDown={async () => {
                      await validate()
                    }}

                    onMouseUp={async () => {
                      if(orderErrors.length === 0) {
                        if(shopDiscountUpdate !== "") {await updateDiscountToSever(shopDiscountUpdate);}
  
                      }
                    }}    

                    onClick={async () => {
                      if(orderErrors.length === 0) {  
                      
                        const path = props.history.location.pathname
                        if(path.includes("/mall")) props.history.push("/mall/cart/complete")
                        else props.history.push("/life/cart/complete")


                      localStorage.removeItem("shipTotal")
                      localStorage.removeItem("discount")
                      localStorage.removeItem("finalCourseCart")
                      localStorage.removeItem("shopTotal")
                      localStorage.removeItem("total")
                      localStorage.removeItem("coursecart")
                      localStorage.removeItem("cart")
                      localStorage.removeItem("finalCart")
                      localStorage.removeItem("courseTotal")
                      localStorage.removeItem("relCourseCouponId")
                      localStorage.removeItem("relShopCouponId")
                      }
                    }}
                    >前往付款</Button>
            </div> 
            </> ) : "" }
            {paymentMethod !== "" && paymentMethod !== "信用卡" ? (
              <div className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary"
                    onMouseDown={async () => {
                      await insertOrderToSever(order, orderList)
                      if(courseDiscountUpdate !== "") await updateDiscountToSever(courseDiscountUpdate)

                    }}

                    onMouseUp={async () => {
                        if(shopDiscountUpdate !== "") {await updateDiscountToSever(shopDiscountUpdate);}
                    }}    

                    onClick={async () => {
                      
                        const path = props.history.location.pathname
                        if(path.includes("/mall")) props.history.push("/mall/cart/complete")
                        else props.history.push("/life/cart/complete")


                      localStorage.removeItem("shipTotal")
                      localStorage.removeItem("discount")
                      localStorage.removeItem("finalCourseCart")
                      localStorage.removeItem("shopTotal")
                      localStorage.removeItem("total")
                      localStorage.removeItem("coursecart")
                      localStorage.removeItem("cart")
                      localStorage.removeItem("finalCart")
                      localStorage.removeItem("courseTotal")
                      localStorage.removeItem("relCourseCouponId")
                      localStorage.removeItem("relShopCouponId")
                    }}
                    >前往付款</Button>
            </div> ) : "" }
        </Container>
        </>
    )
    
}


export default withRouter(CartPayment);