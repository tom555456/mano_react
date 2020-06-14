import React, { Component, Fragment } from "react";
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



class CartPayment extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <>
                <div className="text-center">
                    <h3>付款資訊</h3>
                </div>
                <Fragment>
                    <div className="form-group">
                        <label htmlFor="example3">持卡人姓名：</label>
                        <input type="text" id="example3" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="example3">卡號：</label>
                        <input type="text" id="example3" className="form-control form-control-sm" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group">
                            <label htmlFor="example3">到期日：</label>
                            <input type="text" id="example3" className="form-control form-control-sm" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="example3">CVV：</label>
                            <input type="text" id="example3" className="form-control form-control-sm" />
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="example3">帳單地址：</label>
                            <input type="text" id="example3" className="form-control form-control-sm" />
                        </div>

                    </div>
                </Fragment>
                <div className="d-flex justify-content-center pt-3 pb-3">
                    <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => this.props.history.push("/cart/complete")}>前往付款</Button>
                </div>

            </>
        )
    }
}


export default withRouter(CartPayment);