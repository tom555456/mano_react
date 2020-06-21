import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, Image, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md"

function Cart(props) {
  const [finalCart, setFinalCart] = useState([])
  const [finalCourseCart, setFinalCourseCart] = useState([])

  const [shipTotal, setShipTotal] = useState(0)
  const [shopTotal, setShopTotal] = useState(0)
  const [courseTotal, setCourseTotal] = useState(0)
  const [shopDiscount, setShopDiscount] = useState(0)
  const [courseDiscount, setCourseDiscount] = useState(0)

  const [shopCoupon, setShopCoupon] = useState([])
  const [courseCoupon, setCourseCoupon] = useState([])
  const [member, setMember] = useState([])

  const [relCourseCouponId, setRelCourseCouponId] = useState(0)
  const [relShopCouponId, setRelShopCouponId] = useState(0)


  async function getShopCouponData(memberId) {
    const request = new Request(`http://localhost:3002/order/shopCoupon/${memberId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setShopCoupon(data)
  }

  async function getCourseCouponData(memberId) {
    const request = new Request(`http://localhost:3002/order/courseCoupon/${memberId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setCourseCoupon(data)
  }



  useEffect(() => {
    props.changeBackgroundColorLight()
    
    const member = JSON.parse(localStorage.getItem('member'))
    const memberId = member[0].memberId

    getCourseCouponData(memberId)
    getShopCouponData(memberId)

    const finalCart = localStorage.getItem('finalCart')
    const finalCourseCart = localStorage.getItem('finalCourseCart')

    const shipTotal = localStorage.getItem('shipTotal')
    const shopTotal = localStorage.getItem('shopTotal')
    const courseTotal = localStorage.getItem('courseTotal')


    setFinalCart(JSON.parse(finalCart))
    setFinalCourseCart(JSON.parse(finalCourseCart))
    setShipTotal(Number(shipTotal))
    setShopTotal(Number(shopTotal))
    setCourseTotal(Number(courseTotal))

    setMember(member)
  }, [])



    

  return (
    <>
    <Container>
          {finalCart.length > 0 ? (
            <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">訂單明細</th>
                        <th></th>
                        <th>價格</th>
                        <th></th>
                        <th>數量</th>
                        <th></th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>  
                {finalCart.map(value => ( 
                  <Container className="mb-3">
                      <Row>
                          <Col xs={2}>
                              <Image
                              width={64}
                              height={64}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={10} className="d-flex align-items-center">
                              <p className="w-25">{value.name}</p>
                              <p className="w-25 text-right">${value.price}</p>
                              <p className="w-25 text-right">{value.amount}</p>
                              <p className="w-25 text-right">${value.price * value.amount}</p>
                          </Col>
                      </Row>
                  </Container>
            ))}

                <Row>
                  <Col xs={11} className="d-flex align-items-center justify-content-between m-4">
                    <p><MdLocalShipping className="font-48 mr-1"/>寄送資訊：宅配</p>
                    <p>{member[0].memberName}</p>
                    <p>{member[0].phone}</p>
                    <p>{member[0].paymentCity}</p>
                    <p>{member[0].paymentDistrict}</p>
                    <p>{member[0].shipAddress}</p>
                    <Button className="mt-2 mb-2" size="sm" variant="outline-primary" onClick={() => {
                        const path = props.history.location.pathname
                        if(path.includes("/mall")) props.history.push("/mall/cart/comfirm/change")
                        else props.history.push("/life/cart/comfirm/change")

                      }}>變更</Button>
                    <p>運費：${shipTotal}</p>
                  </Col>
                </Row>
           
            <Row className="d-flex">
                <Col xs={7} className="item-content-left m-4 pt-4">
                {shopCoupon.length > 0 ? (
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>折價券名稱</th>
                        <th>折扣內容</th>
                        <th>有效期限</th>
                      </tr>
                    </thead>
                    <tbody>
                    {shopCoupon.map((value, index) => {
                        return(
                          <tr onClick={() => {
                            setRelShopCouponId(value.rel_coupon_member_id)
                            setShopDiscount(shopTotal - parseInt(shopTotal * Number(value.discountMethod)))
                            }}>
                        <td>{value.discountName}</td>
                        <td>{value.discountMethod}</td>
                        <td>{value.discountPeriod}</td>
                      </tr>
                      )})}
                    </tbody>
                  </Table>) : (
                    <p>目前沒有可使用的優惠</p>
                  )}
                </Col>
                <Col xs={4} className="d-flex fd-col text-right p-5">
                    <p className="">商品總金額：${shopTotal}</p>
                    {(shopDiscount !== 0) ? (<p>折扣金額：${shopDiscount} </p>) : (<p>折扣金額：$0 </p>)}
                    <p className="">折扣後總金額：${shopTotal - shopDiscount}</p>
                </Col>
            </Row>  
            </>
          ) : "" } 

          {finalCourseCart.length > 0 ? (
            <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">訂單明細</th>
                        <th></th>
                        <th>價格</th>
                        <th></th>
                        <th>數量</th>
                        <th></th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>  
                {finalCourseCart.map(value => ( 
                  <Container className="mb-3">
                      <Row>
                          <Col xs={2}>
                              <Image
                              width={64}
                              height={64}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={10} className="d-flex align-items-center">
                              <p className="w-25">{value.name}</p>
                              <p className="w-25 text-right">${value.price}</p>
                              <p className="w-25 text-right">{value.amount}</p>
                              <p className="w-25 text-right">${value.price * value.amount}</p>
                          </Col>
                      </Row>
                  </Container>
            ))}
           
            <Row className="d-flex">
                <Col xs={7} className="item-content-left m-4 pt-4">
                {courseCoupon.length > 0 ? (
                  <Table bordered hover>
                  <thead>
                    <tr>
                      <th>折價券名稱</th>
                      <th>折扣內容</th>
                      <th>有效期限</th>
                    </tr>
                  </thead>
                  <tbody>
                  {courseCoupon.map((value, index) => {
                      return(
                    <tr onClick={() => {
                      setRelCourseCouponId(value.rel_coupon_member_id)
                      setCourseDiscount(courseTotal - parseInt(courseTotal * Number(value.discountMethod)))
                      }}>
                      <td>{value.discountName}</td>
                      <td>{value.discountMethod}</td>
                      <td>{value.discountPeriod}</td>
                    </tr>
                    )})}
                  </tbody>
                </Table>) : (
                  <p>目前沒有可使用的優惠</p>
                )}
                </Col>
                <Col xs={4} className="d-flex fd-col text-right p-5">
                    <p className="">課程總金額：${courseTotal}</p>
                    {(courseDiscount !== 0) ? (<p>折扣金額：${courseDiscount} </p>) : (<p>折扣金額：$0 </p>)}
                    <p className="">折扣後總金額：${courseTotal - courseDiscount}</p>
                </Col>
            </Row>  
            </>
          ) : "" } 

          <Row className="text-right mr-5">
            <Col>
              <p>訂單總金額：${courseTotal + shopTotal - courseDiscount - shopDiscount}</p>           
            </Col>
          </Row>

        <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => {
                  if(courseDiscount !== 0){
                    localStorage.setItem("relCourseCouponId", relCourseCouponId)
                  }
                  if(shopDiscount !== 0){
                    localStorage.setItem("relShopCouponId", relShopCouponId)
                  }
                  localStorage.setItem("discount", courseDiscount + shopDiscount)
                  localStorage.setItem("total", courseTotal + shopTotal - courseDiscount - shopDiscount)
                  const path = props.history.location.pathname
                  if(path.includes("/mall")) props.history.push("/mall/cart/payment")
                  else props.history.push("/life/cart/payment")

              }}>確認付款</Button>
        </Row>
    </Container>
    </>
  )
}

export default withRouter(Cart)