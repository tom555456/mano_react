import React, { Component, Fragment } from "react";
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



class CartComfirmChange extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <>
                
                    <div className="text-center">
                        <h3>配送資訊</h3>
                    </div>
                    <Fragment>
                    <div className="d-flex justify-content-between mt-5">
                        <div className="form-group w-50">
                            <label htmlFor="example3">收件人姓名：</label>
                            <input type="text" id="example3" className="form-control form-control-sm" />
                        </div>
                        <div className="form-group w-50 ml-5">
                            <label htmlFor="example3">收件人電話：</label>
                            <input type="text" id="example3" className="form-control form-control-sm" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="example3">收件地址：</label>
                        <input type="text" id="example3" className="form-control form-control-sm" />
                    </div>

                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="defaultChecked" checked />
                        <label class="custom-control-label" for="defaultChecked">同上一次</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="example3">備註：</label>
                        <input type="text" id="example3" className="form-control form-control-sm" />
                    </div>

                </Fragment>
                <div className="d-flex justify-content-center pt-3 pb-3">
                    <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => this.props.history.push("/cart/comfirm")}>確認配送資訊</Button>
                </div>
                
            </>
        )
    }
}


export default withRouter(CartComfirmChange);