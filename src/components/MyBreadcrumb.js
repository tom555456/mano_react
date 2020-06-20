import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Form, FormControl,Button } from "react-bootstrap"


function MyBreadcrumb(props) {
  const pathlist = [
    "/",
    "/about",
    "/product",
    "/todoapp",
    "/memberlogin",
    "/counter",
    "/membercenter",
  ]
  const pathnames = [
    "首頁",
    "關於",
    "產品",
    "待辨事項",
    "會員登入",
    "計數器",
    "會員中心",
  ]
  // 先找出對應的中文詞
  let locationPathname = props.location.pathname

  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes("/product")) locationPathname = "/product"
  if (locationPathname.includes('/membercenter')) locationPathname = '/membercenter'
  if (locationPathname.includes('/membercenter/coupon')) locationPathname = '/membercenter'
  const index = pathlist.findIndex((v) => v === locationPathname)
  const searchicon={borderRadius:"5px 0 0 5px",width:"20%",height:"100%",border:"1px solid white",borderRight:"none",color:"white",padding:"0"}
  const searchbar={borderRadius:"0 5px 5px 0",width:"80%",height:"100%",background:"transparent",borderLeft:"none",color:"white"}



  return (
    <>
      <nav aria-label="breadcrumb" className="d-flex justify-content-between" >
        <div>
        <ol className="breadcrumb" style={{background:"transparent"}}>
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" style={{color:"white"}}>
            {pathnames[index]}
          </li>
        </ol>
        </div>
        <Form inline style={{width:"204px",height:"30px"}}>
        <Button variant="outline-success" style={searchicon}><i class="fas fa-search"></i></Button>
        <FormControl type="text" placeholder="" className="" style={searchbar}/>
      </Form>
      </nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)
