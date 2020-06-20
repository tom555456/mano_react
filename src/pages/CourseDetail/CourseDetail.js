import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
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

    console.log("detail!!")
    let params = new URLSearchParams(this.props.location.search)
    let courseId = Number(params.get('courseId'))
    
    const response = await fetch(
      `http://localhost:3002/courses`
      //${this.state.catIds}/${currentPage}
    )

    const json = await response.json()
    const allData = json.allData
    const single = allData[courseId - 1]
    // console.log(allData[0])

    this.setState({
        single: single,
      })

    // console.log(totalPages)
    console.log(this.state.single)
    return this.state.data
  }

  async componentDidMount() {
    await this.getItemsDetail()
    this.props.changeBackgroundColorLight()
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
              this.props.history.push('/cart')
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <div className="container">
        {messageModal}
        <div className="tools">
          <CsMyBreadcrumb />
        </div>
            <div className="item-card">
      <div className="courseDetail-img">
        <img
          src={`/courses/${this.state.single.courseImg}`}
          alt={this.state.single.courseImg}
        />
        <div className="learnMore">どうぞ</div>
      </div>
      <div className="item-content">
        <div className="item-content-left">
          <h3 className="item-name">{this.state.single.courseName}</h3>
          <p className="item-description">{this.state.single.courseDesc}</p>
          <p className="item-qty">人數上限：{this.state.single.courseQty}</p>
        </div>
        <div className="item-content-right">
          <h3 className="item-price">$ {this.state.single.coursePrice}</h3>
          <button className="add-cart" onClick={() => {
                this.updateCartToLocalStorage({
                  id: this.state.single.courseId,
                  img: this.state.single.courseImg,
                  name: this.state.single.courseName,
                  amount: 1,
                  price: this.state.single.coursePrice,
                })}} >
            add to cart
          </button>
          <button className="add-fav">add to favtorite</button>
        </div>
      </div>
    </div>
        {/* ))} */}
      </div>
    )
  }
}

export default withRouter(CourseDetail)
