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
import CategoryBar from '../../components/CategoryBar'
import { BsFillPlayFill } from 'react-icons/bs'

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

          <Container class="d-flex justify-content-between">
            <Row>
              <Col xs={0} md={2}>
                <CategoryBar />
              </Col>
              <Col xs={0} md={1}>
              </Col>
              <Col xs={12} md={9}>
                <Row>
                  <Col xs={12} md={6}>
                    <Image
                      src={`/items/${this.state.single.itemImg}`}
                      alt={this.state.single.itemImg}
                      thumbnail
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Card style={{ marginLeft: '50px' }} class="d-flex">
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

                      <div className="link1 link-button" style={{ height: '40px', width: '40px'}}>
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
                      </div>
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{margin: '15px 0'}}>
                    <h4 style={{ width: '100%' }}><BsFillPlayFill />商品詳情</h4>
                    <Card body>
                    這款立領排扣外套採用輕質棉製成，是春夏季的理想選擇。 短袖尖領款式，正面以鈕扣式開合，胸部和腰部設有口袋以便放置各樣細小物件。
                    
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{margin: '15px 0'}}>
                    <h4 style={{ width: '100%' }}><BsFillPlayFill />商品規格</h4>
                    <Card body>
                    材質:100%棉<br/>
                    清洗方式:手洗(切勿機洗)<br/>
                    產地:日本<br/>
                    模特:身高165.9厘米<br/>
                    胸圍：58.4厘米<br/>
                    長度：73.7厘米<br/>
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{margin: '15px 0'}}>
                    <h4 style={{ width: '100%' }}><BsFillPlayFill />運送及其他規則</h4>
                    <Card body>對於您在網路上購買的商品，在商品未穿、未洗、無損壞、寄送錯誤或有瑕疵的情形下，我們原則上同意在30個日曆天（自產品從我們倉儲出貨時起算）內接受退貨。退貨時應附上原始包裝，可辦理全部或部分退費。點此了解更多。</Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default withRouter(ItemDetail)