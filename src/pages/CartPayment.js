import React, { Component, Fragment, useState, useEffect } from "react";
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



function CartPayment (props) {
    const [orderPayment, setOrderPayment] = useState("")

    async function getData() {
        const request = new Request("http://localhost:3002/orderPayment", {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "appliaction/json",
          }),
        })
    
        const response = await fetch(request)
        const data = await response.json()
        // 設定資料
        setOrderPayment(data)
      }
      
      useEffect(() => {
        getData()
      }, [])


    async function insertOrderPaymentToSever(item) {
        const request = new Request("http://localhost:3002/orderPayment/insert", {
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
      
      const handleInsertSave = (orderPayment) => {
        const newOrderPayment = orderPayment
        insertOrderPaymentToSever(newOrderPayment)
        setOrderPayment(newOrderPayment)
      }
    
    return(
        <>
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
                    onClick={() => {
                        handleInsertSave(orderPayment);
                        props.history.push("/cart/complete");
                    }}>前往付款</Button>
            </div>

        </>
    )
    
}


export default withRouter(CartPayment);