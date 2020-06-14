import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"

function MemberEditForm(props) {
  const { member, setMember, isedit, setIsedit ,handleEditedSave} = props
  
  return (
    <>
      <Col md={10} xs={12}>
        <Table responsive>
          <thead>
            <tr>
              <Image
                style={{ width: "50px", height: "50px" }}
                src={`./memberimgs/${member.memberImg}`}
                alt={member.memberImg}
                rounded
              />
              <th colSpan={4}>
                <input id="uploadfile" type="file" />
              </th>
            </tr>
            <tr>
              <th>會員帳號(email)</th>
              <th>會員密碼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  id="editemail"
                  type="email"
                  value={member.email}
                  onChange={(event) => {
                    setMember({
                      ...member,
                      email: event.target.value,
                    })
                  }}
                />
              </td>
              <td>******</td>
            </tr>
          </tbody>
          <thead>
            <th>姓名</th>
            <th>聯絡電話</th>
          </thead>
          <tbody>
            <td>
            <input
              id="editmemberName"
              type="text"
              value={member.memberName}
              onChange={(event) => {
                setMember({
                  ...member,
                  memberName: event.target.value,
                })
              }}
            /></td>
            <td>
              <input
              id="editphone"
              type="text"
              value={member.phone}
              onChange={(event) => {
                setMember({
                  ...member,
                  phone: event.target.value,
                })
              }}
            /></td>
          </tbody>
          <thead>
            <tr>
              <th>住址所在地</th>
              <th>詳細地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input
              id="editpaymentCity"
              type="text"
              value={member.paymentCity}
              onChange={(event) => {
                setMember({
                  ...member,
                  paymentCity: event.target.value,
                })
              }}
            />
            </td>
              <td><input
              id="editshipAddress"
              type="text"
              value={member.shipAddress}
              onChange={(event) => {
                setMember({
                  ...member,
                  shipAddress: event.target.value,
                })
              }}
            /></td>
            </tr>
          </tbody>
          <thead>
            <th>會員等級</th>
            <th>會員加入時間</th>
          </thead>
          <tbody>
            <td>{member.class}</td>
            <td>{member.created_at}</td>
          </tbody>
        </Table>
        <button className="btn btn-primary" onClick={()=>{handleEditedSave(member)}} >SAVE</button>
      </Col>
    </>
  )
}
export default MemberEditForm
