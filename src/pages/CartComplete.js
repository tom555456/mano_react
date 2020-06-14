import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap"



class CartComplete extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <>
                <div className="d-flex fd-col justify-content-center align-items-center">
                    <h2 className="mt-3 mb-3">訂單已完成</h2>
                    <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => {
                        this.props.history.push("/shop");
                        localStorage.setItem("page",1);
                      }}>繼續購物</Button>
                    <Button className="mt-2 mb-2" variant="outline-primary">訂單查詢</Button>
                </div>
            </>
        )
    }
}


export default withRouter(CartComplete);