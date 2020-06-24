import React, { Component } from 'react'
import $ from 'jquery'

import {
  Modal,
  Button,
  ListGroupItem,
  Card,
  ListGroup,
  Input,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import {
  Magnifier,
  GlassMagnifier,
  MagnifierContainer,
  SideBySideMagnifier,
  MagnifierPreview,
  MagnifierZoom,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import { withRouter } from 'react-router-dom'
import './courseDetail-style.css'
import CsMyBreadcrumb from '../../components/CsMyBreadcrumb'
// import Detail from '../../components/Course/Detail'


class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      totalPages: '',
      search: '',
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      showPage: true,
      single: [],
      amount: 1,
      related1: [],
      related2: [],
      related3: [],
    }
  }

  //加入購物車
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  updateCartToLocalStorage = (value) => {
    // 開啟載入指示
    //setDataLoading(true)

    const currentCart = JSON.parse(localStorage.getItem('coursecart')) || []

    // console.log('currentCart', currentCart)

    const newCart = [...currentCart, value]
    localStorage.setItem('coursecart', JSON.stringify(newCart))

    // console.log('newCart', newCart)
    // 設定資料

    this.setState({
      mycart: newCart,
      productName: value.name,
    })
    this.handleShow()
    //alert('已成功加入購物車')
  }
  //加入購物車 end

  //單一商品
  getItemsDetail = async () => {
    console.log('detail!!')
    let params = new URLSearchParams(this.props.location.search)
    let courseId = Number(params.get('courseId'))

    const response = await fetch(
      `http://localhost:3002/courses`
      //${this.state.catIds}/${currentPage}
    )

    const json = await response.json()
    const allData = json.allData
    const single = allData[courseId - 1]
    const related1 = allData[courseId]
    const related2 = allData[courseId + 1 ]
    const related3 = allData[courseId + 2 ]
 
    console.log(allData)


    this.setState({
      single: single,
      related1: related1,
      related2: related2,
      related3: related3,
        })

    // console.log(totalPages)
    console.log(this.state.single)
    return this.state.data
  }

  async componentDidMount() {
    this.props.changeBackgroundColorLight()
    await this.getItemsDetail()
  }

  render() {
    const messageModal = (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品：{this.state.productName} 已成功加入購物車</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const path = this.props.history.location.pathname
              if(path.includes("/mall")) this.props.history.push("/mall/cart")
              else this.props.history.push("/life/cart")

            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <>
      <div className="container">
        {messageModal}
        <div className="tools" style={{ paddingTop: '12px' }}>
          <CsMyBreadcrumb />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80%'}}>
            <img
              style={{ width: '90%' }}
              src={`/courses/${this.state.single.courseImg}`}
              alt={this.state.single.courseImg}
            />
            {/* <MagnifierContainer>
              <div className="example-class">
                <MagnifierPreview style={{ height: "80%" , width :"80%" }} imageSrc={`/courses/${this.state.single.courseImg}`}/>
              </div>
                <MagnifierZoom style={{ height: "200px", width:"200px"}} imageSrc={`/courses/${this.state.single.courseImg}`}/>
            </MagnifierContainer> */}
          </div>

          <Card style={{ width: '22rem', height:'30%' }}>
            <Card.Body>
              <Card.Title>
                <h3 className="name">{this.state.single.courseName}</h3>
              </Card.Title>
              <Card.Text>
                <p>{this.state.single.courseDesc}</p>
                <div className="people">
                  <p>人數上限：{this.state.single.courseQty}</p>
                  <p>日期:{this.state.single.coursePeriod}</p>
                </div>
              </Card.Text>
            </Card.Body>

            <ListGroup>
              <ListGroupItem>
                <h1 className="price">$ {this.state.single.coursePrice}</h1>
              </ListGroupItem>

              <ListGroupItem>
                <InputGroup className="mb-3">
                  <InputGroup.Append>
                    <Button
                      className="sub"
                      onClick={() =>
                        this.setState({ 
                          amount: this.state.amount - 1 
                          })
                      }
                    >
                      -
                    </Button>
                  </InputGroup.Append>
                  <FormControl
                    style={{
                      textAlign: 'center',
                    }}
                    onChange={(event) => {
                      this.setState({ amount: event.target.value })
                    }}
                    value={this.state.amount < 1 ? 1 : this.state.amount }
                  />
                  <InputGroup.Append>
                    <Button
                      onClick={() =>
                        this.setState({ amount: this.state.amount + 1 })
                      }
                    >
                      +
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </ListGroupItem>
            </ListGroup>

            <Card.Body className="cart">
              <Card.Link>
                <Button
                  className="add-cart"
                  id="btns1"
                  onClick={() => {
                    for (let i = 0; i < this.state.amount; i++) {
                      this.updateCartToLocalStorage({
                        id: this.state.single.courseId,
                        img: this.state.single.courseImg,
                        name: this.state.single.courseName,
                        amount: 1,
                        price: this.state.single.coursePrice,
                      })
                    }
                  }}
                >
                  add to cart
                </Button>
                <Button className="add-fav" id="btns2">
                  add to favtorite
                </Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </div>


    <div>
        <div><h5>為您推薦</h5><h6>MANO Recommended</h6></div>
      <div style={{display: "flex"}}>
          <Card 
          style={{ height: '15rem', width:'10rem'}}
          >    
          <Card.Body>
              <Card.Link 
              href={`/courseDetail${this.state.related1.linkUrl}/categoryId=${this.state.related1.categoryId}?courseId=${this.state.related1.courseId}`}>
                  <img
                    style={{ height: "60%", objectFit: "cover"}}
                    src={`/courses/${this.state.related1.courseImg}`}
                    alt={this.state.related1.courseImg}
                  />
                    <Card.Title>
                      <h6 className="name">{this.state.related1.courseName}</h6>
                    </Card.Title> 
                    </Card.Link> 
                  </Card.Body>
          </Card>
          <Card style={{ height: '15rem', width:'10rem'}}>
          <Card.Body>
              <Card.Link 
                    href={`/courseDetail${this.state.related2.linkUrl}/categoryId=${this.state.related2.categoryId}?courseId=${this.state.related2.courseId}`}>
                <img
                  style={{ height: "60%", objectFit: "cover"}}
                  src={`/courses/${this.state.related2.courseImg}`}
                  alt={this.state.related2.courseImg}
                />
                
                 
                      <Card.Title>
                        <h6 className="name">{this.state.related2.courseName}</h6>
                      </Card.Title>
                </Card.Link> 
               </Card.Body>
          </Card>
          <Card style={{ height: '15rem', width:'10rem' }}>
            <Card.Body>
              <Card.Link 
                        href={`/courseDetail${this.state.related3.linkUrl}/categoryId=${this.state.related3.categoryId}?courseId=${this.state.related3.courseId}`}>
              <img
                style={{ height: "60%", objectFit: "cover"}}
                src={`/courses/${this.state.related3.courseImg}`}
                alt={this.state.related3.courseImg}
              />
               
                      <Card.Title>
                        <h6 className="name">{this.state.related3.courseName}</h6>
                      </Card.Title>
                </Card.Link> 
              </Card.Body>
          </Card>
       
        </div>
      </div>

  </div>
      </>
    )
  }
}

export default withRouter(CourseDetail)
