import React, { Component, Fragment, useState, useEffect } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



function CartPayment (props) {
    const [order, setOrder] = useState("")
    const [orderList, setOrderList] = useState("")
    const [orderPayment, setOrderPayment] = useState("")
    const [finalCart, setFinalCart] = useState([])
    const [finalCourseCart, setFinalCourseCart] = useState([])
    const [insertId, setInsertId] = useState(0)

    const [name, setName] = useState("")
    const [card, setCard] = useState("")
    const [closingDate, setClosingDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [address, setAddress] = useState("")
    const [orderErrors, setOrderErrors] = useState([])

    const [courseDiscountUpdate, setCourseDiscountUpdate] = useState("")
    const [shopDiscountUpdate, setShopDiscountUpdate] = useState("")

    useEffect(() => {
        props.changeBackgroundColorLight()

        const finalCart = JSON.parse(localStorage.getItem('finalCart'))
        const finalCourseCart = JSON.parse(localStorage.getItem('finalCourseCart'))

        const total = localStorage.getItem('total')
        const member = JSON.parse(localStorage.getItem('member'))
        const note = localStorage.getItem('note') || ""

        const relCourseCouponId = localStorage.getItem("relCourseCouponId")
        const relShopCouponId = localStorage.getItem("relShopCouponId")

        setFinalCart(finalCart)
        setFinalCourseCart(finalCourseCart)

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
            totalPrice: Number(total),
            paymentStatus: "已付款",
            shipStatus: "未出貨",
            note: note
        })

        
    
      }, [])


      async function orderSuccessCallback() {
        console.log("callback")
        await insertOrderToSever(order)
        if(courseDiscountUpdate !== "") await updateDiscountToSever(courseDiscountUpdate)
        if(shopDiscountUpdate !== "") await updateDiscountToSever(shopDiscountUpdate)
        console.log(shopDiscountUpdate)
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
    
    
      async function insertOrderListToSever(item) {
        const request = new Request("http://localhost:3002/order/insertOrderList", {
          method: "POST",
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


      async function insertOrderPaymentToSever(item) {
        const request = new Request("http://localhost:3002/order/insertOrderPayment", {
          method: "POST",
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




    async function insertOrderToSever(item) {
        const request = new Request("http://localhost:3002/order/insertOrder", {
          method: "POST",
          body: JSON.stringify(item),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
    
        console.log("After JSON: ", JSON.stringify(item))
    
        const response = await fetch(request)
        const data = await response.json()

        console.log(data)

        const id = data.results.insertId
        await setInsertId(id)
      }

      
      const handleInsertData = async () => {

        await setOrderPayment({
            ...orderPayment,
            orderId: insertId
        })

        let newOrderList = []

          for(let i=0; i < finalCart.length; i++ ) {
            await newOrderList.push({
                orderId: insertId,
                itemId: finalCart[i].id,
                checkPrice: finalCart[i].price,
                checkQuantity: finalCart[i].amount,
                checkSubtotal: finalCart[i].price * finalCart[i].amount
            })
          }

          for(let i=0; i < finalCourseCart.length; i++ ) {
            await newOrderList.push({
                ...orderList,
                orderId: insertId,
                courseId: finalCourseCart[i].id,
                checkPrice: finalCourseCart[i].price,
                checkQuantity: finalCourseCart[i].amount,
                checkSubtotal: finalCourseCart[i].price * finalCourseCart[i].amount
            })
          }

          await setOrderList(newOrderList)
    }
    
    return(
        <>
        <Container className="w-75">
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
            <div className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary"
                    onMouseDown={async () => {
                      await validate()
                    }}

                    onMouseUp={async () => {
                      if(orderErrors.length === 0) await handleInsertData()
                    }}    

                    onClick={async () => {
                      if(orderErrors.length === 0) {  
                        await insertOrderPaymentToSever(orderPayment)
                        for(let i = 0; i < orderList.length; i++) {
                          await insertOrderListToSever(orderList[i])
                        }

                      props.history.push("/cart/complete");

                      {/* localStorage.removeItem("shipTotal")
                      localStorage.removeItem("finalCourseCart")
                      localStorage.removeItem("shopTotal")
                      localStorage.removeItem("total")
                      localStorage.removeItem("coursecart")
                      localStorage.removeItem("cart")
                      localStorage.removeItem("finalCart")
                      localStorage.removeItem("courseTotal")
                      localStorage.removeItem("relCourseCouponId")
                      localStorage.removeItem("relShopCouponId") */}
                      }
                    }}
                    >前往付款</Button>
            </div>  
        </Container>
        </>
    )
    
}


export default withRouter(CartPayment);