import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  const pathlist = [
    '/',
    '/about',
    '/product',
    '/todoapp',
    '/memberlogin',
    '/counter',
  ]
  const pathnames = ['首頁', '關於', '產品', '待辨事項', '會員登入', '計數器']

  // 先找出對應的中文詞
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/product')) locationPathname = '/product'

  const index = pathlist.findIndex((v) => v === locationPathname)

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
      </nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)
