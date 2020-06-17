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
  // if (locationPathname.includes('/course')) locationPathname = '/course'
  // if (locationPathname.includes('/cuisine')) locationPathname = '/cuisine'

  const index = pathlist.findIndex((v) => v === locationPathname)

console.log(locationPathname)


const allcourse = (
  <>
  <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
  </>
)

const detail = (
  <>
  <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item">
          <Link 
          to="/course?categoryId=26"
          onClick={() => props.history.push("/course?categoryId=26")}
          >所有課程</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
     </>
)

let display;

if(locationPathname = '/course/limit'){
  display = allcourse
}else{
  display = detail
}

  return (
    <>
      <nav aria-label="breadcrumb">
      {display}
      </nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)
