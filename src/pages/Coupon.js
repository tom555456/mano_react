import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"
import MemberSideLink from "./MemberSideLink"
import MyBreadcrumb from '../components/MyBreadcrumb'

function Coupon() {
  const [coupon, setCoupon] = useState([])
  async function getData() {
    const request = new Request("http://localhost:3002/membercenter/coupon", {
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
    setCoupon(data)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <MyBreadcrumb />
      <MemberSideLink>
        <Col md={10} xs={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>折價券名稱</th>
              <th>折扣內容</th>
              <th>有效期限</th>
              <th>獲得日期</th>
            </tr>
          </thead>
          <tbody>
          {coupon.map((value, index) => {
              return(
            <tr>
              <td>{value.discountName}</td>
              <td>{value.discountMethod}</td>
              <td>{value.discountPeriod}</td>
              <td>{value.created_at}</td>
            </tr>
            )})}
          </tbody>
        </Table>
        </Col>
      </MemberSideLink>
    </>
  )
}
export default Coupon
