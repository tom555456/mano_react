import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap"



class CartComplete extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.changeBackgroundColorLight()
    }

    render() {
        return(
            <>
                <div className="d-flex fd-col justify-content-center align-items-center">
                    <h2 className="mt-3 mb-3">訂單已完成</h2>
                    <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => {
                        const path = this.props.history.location.pathname
                        if(path.includes("/mall")) this.props.history.push("/mall/shop")
                        else this.props.history.push("/life/course")
                        localStorage.setItem("page",1);
                      }}>繼續購物</Button>
                    <Button className="mt-2 mb-2" variant="outline-primary">訂單查詢</Button>
                </div>
            </>
        )
    }
}


export default withRouter(CartComplete);