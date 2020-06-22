import React, { Component } from 'react'
import {
  Modal,
  Button,
  Image,
  InputGroup,
  Col,
  Card,
  Container,
  Row,
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import './ItemDetail-style.css'
import DetailBreadcrumb from '../../components/DetailBreadcrumb'
import { FaFacebookSquare, FaLine } from 'react-icons/fa'

import bgSvg from '../../components/bg-pattern.svg'
import ItemDetailBg from './ItemDetailBg'

class ItemDetail extends Component {
  constructor(props) {
    super(props)
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
      amount: 1,
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
    this.props.changeBackgroundColorLight()
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
              const path = this.props.history.location.pathname
              if (path.includes('/mall')) this.props.history.push('/mall/cart')
              else this.props.history.push('/life/cart')
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <>
        <div style={{ backgroundImage: `url(${bgSvg})` }} className="bgSvg">
          <ItemDetailBg />
        </div>
        <div className="container">
          {messageModal}
          <div className="tools">
            <DetailBreadcrumb />
          </div>

          <Container>
            <Row xs={12} md={2}>
              <Image
                src={`/items/${this.state.single.itemImg}`}
                alt={this.state.single.itemImg}
                thumbnail
              />

              <Row xs={12} md={2}>
                <Card style={{ marginLeft: '50px' }}>
                  <Card.Body className="card-detail">
                    <Card.Title
                      style={{
                        borderBottom: '5px solid #5E6248',
                        padding: '5px',
                      }}
                    >
                      {this.state.single.itemName}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '15px', color: '#999' }}>
                      {this.state.single.itemDescription}
                    </Card.Text>
                  </Card.Body>

                  <div className="link1">
                    <a href="http://www.facebook.com">
                      <FaFacebookSquare
                        style={{
                          fontSize: '40px',
                        }}
                      />
                    </a>
                  </div>
                  <div className="link2">
                    <a href="https://line.me/zh-hant/">
                      <FaLine
                        style={{
                          fontSize: '40px',
                        }}
                      />
                    </a>
                  </div>

                  <h3 className="item-price">
                    $ {this.state.single.itemPrice}
                  </h3>

                  <div>
                    <Button
                      onClick={() =>
                        this.setState({ amount: this.state.amount - 1 })
                      }
                      style={{ margin: '5px' }}
                    >
                      -
                    </Button>

                    <input
                      style={{
                        textAlign: 'center',
                      }}
                      onChange={(event) => {
                        this.setState({ amount: event.target.value })
                      }}
                      value={this.state.amount < 1 ? 1 : this.state.amount}
                    />

                    <Button
                      onClick={() =>
                        this.setState({ amount: this.state.amount + 1 })
                      }
                      style={{ margin: '5px' }}
                    >
                      +
                    </Button>
                  </div>

                  <select style={{ margin: '10px' }}>
                    {/* <option>請選擇商品尺寸</option> */}
                    <option>F</option>
                  </select>

                  <div>
                    <Button
                      className="add-cart"
                      onClick={() => {
                        for (let i = 0; i < this.state.amount; i++) {
                          this.updateCartToLocalStorage({
                            id: this.state.single.itemId,
                            img: this.state.single.itemImg,
                            name: this.state.single.itemName,
                            amount: 1,
                            price: this.state.single.itemPrice,
                            shippingId: this.state.single.shippingId,
                          })
                        }
                      }}
                    >
                      add to cart
                    </Button>

                    <Button className="add-fav">add to favtorite</Button>
                  </div>
                </Card>
              </Row>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default withRouter(ItemDetail)
