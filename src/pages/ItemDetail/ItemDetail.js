import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import './ItemDetail-style.css'
import MyBreadcrumb from '../../components/MyBreadcrumb'
// import Detail from '../../components/Course/Detail'

class ItemDetail extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      totalPages: '',
      searchValue: '',
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      catIds: '',
      catData: [],
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

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // console.log('currentCart', currentCart)

    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))

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

  //fetch 商品
  getItemsData = async () => {
    let currentPage = localStorage.getItem('page') || 1
    const response = await fetch(
      `http://localhost:3002/items/${this.state.catIds}/${currentPage}`
      //${this.state.catIds}/${currentPage}
    )
    console.log(this.state.catIds)

    const json = await response.json()
    const items = json.rows
    const allData = json.allData
    const totalPages = json.totalPages
    const totalRows = json.totalRows

    // const single = allData[3]
    // console.log(allData[0])

    this.setState({
      data: items,
      totalPages: totalPages,
      totalRows: totalRows,
    })
    // console.log(totalPages)
    console.log(this.state.data)
    return this.state.data
  }

  //單一商品
  getItemsDetail = async () => {
    console.log('detail!!')
    let params = new URLSearchParams(this.props.location.search)
    let itemId = Number(params.get('itemId'))

    const response = await fetch(
      `http://localhost:3002/items`
      //${this.state.catIds}/${currentPage}
    )

    const json = await response.json()
    const allData = json.allData
    const single = allData[itemId - 3]
    console.log(allData)

    this.setState({
      single: single,
    })

    // console.log(totalPages)
    console.log(this.state.data)
    return this.state.data
  }

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')
    if (catIdParams) {
      await this.setState({
        catIds: (this.state.catIds += catIdParams),
      })

      // await this.getRecursiveCategoryIds(catIdParams)
    }

    await this.getItemsData()
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
          <MyBreadcrumb />
        </div>
        {/* {this.state.data.map(course =>( */}
        {/* <Detail
              key={this.state.single.courseId}
              courseImg={this.state.single.courseImg}
              courseImg2={this.state.single.courseImg2}
              courseName={this.state.single.courseName}
              courseDesc={this.state.single.courseDesc}
              coursePrice={this.state.single.coursePrice}
              courseQty={this.state.single.courseQty}
              handleClick={() => {
                this.updateCartToLocalStorage({
                  id: this.state.single.courseId,
                  img: this.state.single.courseImg,
                  name: this.state.single.courseName,
                  amount: 1,
                  price: this.state.single.coursePrice,
                })
              }}
            /> */}
        <div className="item-card">
          <div className="courseDetail-img">
            <img
              src={`/items/${this.state.single.itemImg}`}
              alt={this.state.single.itemImg}
            />
            <div className="learnMore">どうぞ</div>
          </div>
          <div className="item-content">
            <div className="item-content-left">
              <h3 className="item-name">{this.state.single.itemName}</h3>
              <p className="item-description">
                {this.state.single.itemDescription}
              </p>
              {/* <p className="item-qty">
                人數上限：{this.state.single.courseQty}
              </p> */}
            </div>
            <div className="item-content-right">
              <h3 className="item-price">$ {this.state.single.itemPrice}</h3>
              <button
                className="add-cart"
                onClick={() => {
                  this.updateCartToLocalStorage({
                    id: this.state.single.itemId,
                    img: this.state.single.itemImg,
                    name: this.state.single.itemName,
                    amount: 1,
                    price: this.state.single.itemPrice,
                  })
                }}
              >
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

export default withRouter(ItemDetail)
