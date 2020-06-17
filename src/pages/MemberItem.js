import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"

function MemberItem(props) {
  const { member,isedit,setIsedit,ischangepwd, setIschangepwd} = props
  
  return (
    <>
      <Col md={10} xs={12}>
        <Table responsive>
          <thead>
            <tr>
              <th colSpan={4}>
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={`./memberimgs/${member.memberImg}`}
                  alt={member.memberImg}
                  rounded
                />
              </th>
            </tr>
            <tr>
              <th>會員帳號(email)</th>
              <th>會員密碼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{member.email}</td>
              <td>******
              <button onClick={()=>setIschangepwd(!ischangepwd)}>
              修改
              </button>
                </td>
            </tr>
          </tbody>
          <thead>
            <th>姓名</th>
            <th>聯絡電話</th>
          </thead>
          <tbody>
            <td>{member.memberName}</td>
            <td>{member.phone}</td>
          </tbody>
          <thead>
            <tr>
              <th>住址所在地</th>
              <th>詳細地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{member.paymentCity}{member.paymentDistrict}</td>
              <td>{member.shipAddress}</td>
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
        <button className="btn btn-primary" onClick={() => setIsedit(!isedit)}>
          Edit
        </button>
        
      </Col>
    </>
  )
}
export default MemberItem
