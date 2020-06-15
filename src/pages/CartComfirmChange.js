import React, { Component, Fragment, useEffect, useState } from "react";
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"

import { withRouter } from "react-router-dom";



function CartComfirmChange(props) {
    const [member, setMember] = useState("")
    const [isSame, setIsSame] = useState(true)

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
      }, [])
    
      async function updateMemberToSever(item, successCallback = () => {}) {
        const request = new Request("http://localhost:3002/membercenter/edit", {
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
      
      const handleEditedSave = (member) => {
        const newMember = member
        updateMemberToSever(newMember)
        setMember(newMember)
      }
    



    
    return(
        <>   
            <div className="text-center">
                <h3>配送資訊</h3>
            </div>
            <Fragment>
            <div className="d-flex justify-content-between mt-5">
                <div className="form-group w-50">
                    <label htmlFor="example3">收件人姓名：</label>
                    <input type="text" id="example3" className="form-control form-control-sm" 
                           value={isSame ? member.memberName : ""}
                           onChange={(event) => setMember({
                               ...member,
                               memberName: event.target.value
                           })} />
                </div>
                <div className="form-group w-50 ml-5">
                    <label htmlFor="example3">收件人電話：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           value={isSame ? member.phone : ""}
                           onChange={(event) => setMember({
                               ...member,
                               phone: event.target.value
                           })}/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="example3">收件地址：</label>
                <input type="text" id="example3" className="form-control form-control-sm"
                       value={isSame ? member.shipAddress : ""}
                       onChange={(event) => setMember({
                            ...member,
                            shipAddress: event.target.value
                        })}/>
            </div>

            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultChecked" onClick={() => setIsSame(!isSame)} checked={isSame ? true : false} />
                <label class="custom-control-label" for="defaultChecked">同上一次</label>
            </div>

            <div className="form-group">
                <label htmlFor="example3">備註：</label>
                <input type="text" id="example3" className="form-control form-control-sm" />
            </div>

            </Fragment>
            <div className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary" 
                        onClick={() => {
                            handleEditedSave(member);
                            props.history.push("/cart/comfirm")
                        }}>確認配送資訊</Button>
            </div>
            
        </>
    )
    
}


export default withRouter(CartComfirmChange);