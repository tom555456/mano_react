import React, { Component, Fragment, useState, useEffect } from "react";
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



function CartPayment (props) {
    const [order, setOrder] = useState("")
    const [orderList, setOrderList] = useState("")
    const [orderPayment, setOrderPayment] = useState("")
    const [finalCart, setFinalCart] = useState([])
    const [finalCourseCart, setFinalCourseCart] = useState([])
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState("")
    const [shipInfo, setShipInfo] = useState("")
    const [note, setNote] = useState("")
    const [insertId, setInsertId] = useState(0)


    useEffect(() => {

        const finalCart = JSON.parse(localStorage.getItem('finalCart'))
        const finalCourseCart = JSON.parse(localStorage.getItem('finalCourseCart'))

        const total = localStorage.getItem('total')
        const shipInfo = JSON.parse(localStorage.getItem('shipInfo'))
        const note = localStorage.getItem('note') || ""

        setFinalCart(finalCart)
        setFinalCourseCart(finalCourseCart)
        setTotal(Number(total))
        setShipInfo(shipInfo)
        setNote(note)

        setOrder({
            ...order,
            username: shipInfo[0].memberName,
            orderPhone: Number(shipInfo[0].phone),
            shipAddress: shipInfo[0].shipAddress,
            totalPrice: Number(total),
            paymentStatus: "已付款",
            shipStatus: "未出貨",
            note: note
        })
    
      }, [])



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

      
      const handleInsertData = () => {

        setOrderPayment({
            ...orderPayment,
            orderId: insertId
        })

        let newOrderList = []

          for(let i=0; i < finalCart.length; i++ ) {
            newOrderList.push({
                orderId: insertId,
                itemId: finalCart[i].id,
                checkPrice: finalCart[i].price,
                checkQuantity: finalCart[i].amount,
                checkSubtotal: finalCart[i].price * finalCart[i].amount
            })
          }

          for(let i=0; i < finalCourseCart.length; i++ ) {
            newOrderList.push({
                ...orderList,
                orderId: insertId,
                courseId: finalCourseCart[i].id,
                checkPrice: finalCourseCart[i].price,
                checkQuantity: finalCourseCart[i].amount,
                checkSubtotal: finalCourseCart[i].price * finalCourseCart[i].amount
            })
          }

          setOrderList(newOrderList)
    }
    
    return(
        <>
        <Container className="w-75">
            <div className="text-center">
                <h3>付款資訊</h3>
            </div>
            <Fragment>
                <div className="form-group">
                    <label htmlFor="example3">持卡人姓名：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           onChange={(event) => setOrderPayment({
                               ...orderPayment,
                               orderPaymentName: event.target.value
                           })} />
                </div>
                <div className="form-group">
                    <label htmlFor="example3">卡號：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           onChange={(event) => setOrderPayment({
                                    ...orderPayment,
                                    orderPaymentCard: event.target.value
                                })} />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="form-group">
                        <label htmlFor="example3">到期日：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                               onChange={(event) => setOrderPayment({
                                    ...orderPayment,
                                    closingDate: event.target.value
                                })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="example3">CVV：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                                onChange={(event) => setOrderPayment({
                                    ...orderPayment,
                                    cvv: event.target.value
                                })} />
                    </div>
                    <div className="form-group w-50">
                        <label htmlFor="example3">帳單地址：</label>
                        <input type="text" id="example3" className="form-control form-control-sm"
                            onChange={(event) => setOrderPayment({
                                ...orderPayment,
                                checkAddress: event.target.value
                            })} />
                    </div>

                </div>
            </Fragment>
            <div className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary"
                    onMouseDown={async () => {
                      //console.log("down")
                      await insertOrderToSever(order)
                    }}
                    onMouseUp={async () => {
                      //console.log("up")
                      await handleInsertData()

                    }}        
                    onClick={async () => {
                      //console.log("click")
                      insertOrderPaymentToSever(orderPayment)
                      //console.log(orderList)
                      for(let i = 0; i < orderList.length; i++) {
                        await insertOrderListToSever(orderList[i])
                      }
                      props.history.push("/cart/complete");

                      localStorage.removeItem("shipTotal")
                      localStorage.removeItem("finalCourseCart")
                      localStorage.removeItem("shopTotal")
                      localStorage.removeItem("total")
                      localStorage.removeItem("shipInfo")
                      localStorage.removeItem("coursecart")
                      localStorage.removeItem("cart")
                      localStorage.removeItem("finalCart")
                      localStorage.removeItem("courseTotal")
                      
                    }}
                    >前往付款</Button>
            </div>  
        </Container>
        </>
    )
    
}


export default withRouter(CartPayment);