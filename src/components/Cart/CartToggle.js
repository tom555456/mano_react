import React, {useState, useEffect} from "react";
import { Table, Container, Row, Col, Image, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import { FaUndo } from 'react-icons/fa'
import { BsFillPlayFill, BsX } from 'react-icons/bs'
import "../../styles/cartToggle.scss"
import "../../styles/cart.scss"


function CartToggle(props) {
    const [mycart, setMycart] = useState([])
    const [mycartDisplay, setMycartDisplay] = useState([])
  
    const [myCourseCart, setMyCourseCart] = useState([])
    const [myCourseCartDisplay, setMyCourseCartDisplay] = useState([])
  
    useEffect(() => {
  
      const initCart = localStorage.getItem('cart') || '[]'
      const cartJson = JSON.parse(initCart)
      const initCourseCart = localStorage.getItem('coursecart') || '[]'
      const courseCartJson = JSON.parse(initCourseCart)
  
      setMycart(cartJson)
      setMyCourseCart(courseCartJson)
    }, [])
  
    useEffect(() => {
      let newMycartDisplay = []
  
      console.log('mycart', mycart)
  
      for (let i = 0; i < mycart.length; i++) {
        const index = newMycartDisplay.findIndex(
          (value) => value.id === mycart[i].id
        )
  
        if (index !== -1) {
          newMycartDisplay[index].amount += mycart[i].amount
        } else {
          const newItem = { ...mycart[i] }
          newMycartDisplay = [...newMycartDisplay, newItem]
        }
      }
  
      setMycartDisplay(newMycartDisplay)
    }, [mycart])
  
    useEffect(() => {
      let newMyCourseCartDisplay = []
  
      for (let i = 0; i < myCourseCart.length; i++) {
        const index = newMyCourseCartDisplay.findIndex(
          (value) => value.id === myCourseCart[i].id
        )
  
        if (index !== -1) {
          newMyCourseCartDisplay[index].amount += myCourseCart[i].amount
        } else {
          const newCourseItem = { ...myCourseCart[i] }
          newMyCourseCartDisplay = [...newMyCourseCartDisplay, newCourseItem]
        }
      }
  
      setMyCourseCartDisplay(newMyCourseCartDisplay)
    }, [myCourseCart])
  
    function removeCourseCartToLocalStorage(value) {
        let foundObj = value
        let filtered = myCourseCart.filter((el) => el.id != foundObj.id)
        const newCart = filtered
        localStorage.setItem('coursecart', JSON.stringify(newCart))
    
        setMyCourseCart(newCart)
      }
    
      function removeCartToLocalStorage(value) {
        let foundObj = value
        let filtered = mycart.filter((el) => el.id != foundObj.id)
        const newCart = filtered
        localStorage.setItem('cart', JSON.stringify(newCart))
    
        setMycart(newCart)
      }
    
    

    return(
        <>
        <div className="trans-5s" style={{position: "relative",zIndex: "1001"}}>
            <div className="cartToggle-box">
            {mycartDisplay.length > 0 ? (
        <Container>
          <p>
            <BsFillPlayFill />
            購買的商品
          </p>
          <Row>
            <Col className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-25">商品</th>
                    {/*  */}
                    <th className="w-25">價格</th>
                    <th className="w-25">數量</th>
                    <th className="w-25">小計</th>
                  </tr>
                </thead>
              </Table>
              {mycartDisplay.map((value) => (
                  <Row className="mb-2">
                    <div className="w-25 ml-3 mr-4">
                      <Image
                        width={50}
                        height={50}
                        src={`/items/${value.img}`}
                        alt={value.img}
                      />
                      </div>
                        <p className="cardPrice">
                          ${value.price}
                        </p>
                        <p className="cardNumber">
                          {value.amount}
                        </p>
                        <p className="text-right cardTotal">
                          ${value.price * value.amount}
                        </p>
                        <p
                          className="text-right cross"
                          onClick={() =>
                            removeCartToLocalStorage({
                              id: value.id,
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>                    
                    
                  </Row>
              ))}
            </Col>
          </Row>
          </Container>
            ) : "" }

            {myCourseCartDisplay.length > 0 ? (
        <Container className="mt-2">
          <p>
            <BsFillPlayFill />
            購買的課程
          </p>
          <Row>
            <Col className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-25">課程</th>
                    <th className="w-25">價格</th>
                    <th className="w-25">數量</th>
                    <th className="w-25">小計</th>
                  </tr>
                </thead>
              </Table>
              {myCourseCartDisplay.map((value) => (
                  <Row className="mb-2">
                    <div className="w-25 ml-3 mr-4">
                      <Image
                        width={50}
                        height={50}
                        src={`/items/${value.img}`}
                        alt={value.img}
                      />
                    </div>
                        <p className="cardPrice">
                          ${value.price}
                        </p>
                        <p className="cardNumber">
                          {value.amount}
                        </p>
                        <p className="text-right cardTotal">
                          ${value.price * value.amount}
                        </p>
                        <p
                          className="text-right cross"
                          onClick={() =>
                            removeCourseCartToLocalStorage({
                              id: value.id,
                              img: value.img,
                              name: value.name,
                              amount: 1,
                              price: value.price,
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>
                      </Row>
              ))}
            </Col>
            </Row>
          </Container>
            ) : "" }

            {mycartDisplay.length <= 0 && myCourseCartDisplay.length <= 0 ? (
        <div className="d-flex justify-content-center">
          <h4 className="cartMargin">購物車沒有東西</h4>
        </div>
      ) : (
        ''
      )}

      {mycartDisplay.length > 0 || myCourseCartDisplay.length > 0 ? (
        <Container>
          <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button
              className="mt-2 cartToggle-btn"
              variant="outline-primary"
              onClick={() => {

                  const path = props.history.location.pathname
                  if (path.includes('/mall'))
                    props.history.push('/mall/cart')
                  else props.history.push('/life/cart')
                
              }}
            >
              前往購物車
            </Button>
          </Row>
        </Container>
      ) : (
        ''
      )}

            </div>
        </div>
        </>
    )
}


export default withRouter(CartToggle)