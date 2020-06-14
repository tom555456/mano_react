import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  const pathlist = [
    '/',
    '/course',
    '/course/cuisine',
    '/course/clothes',
    '/course/life',
    '/course/limit',
    '/course/new',
    '/course/anti',
  ]
  const pathnames = ['首頁', '所有課程', '抹の食', '抹の著', '抹の生活', '期間限定', '手摘專屬體驗', '防疫限定']

  // 先找出對應的中文詞
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/course')) locationPathname = '/course'

  const index = pathlist.findIndex((v) => v === locationPathname)

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
            {/* <Link to="/course">所有課程</Link>
            <Link to="/course/cuisine?categoryId=27">抹の食</Link>
            <Link to="/course/clothes">抹の著</Link>
            <Link to="/course/life">抹の生活</Link>
            <Link to="/course/limit">期間限定</Link>
            <Link to="/course/new">手摘專屬體驗</Link>
            <Link to="/course/anti">防疫限定</Link> */}
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
