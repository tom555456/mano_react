import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  const [showAll, setShowAll] = useState('visible');
  // useEffect(() => {
  //   if (clickParams) {
  //     setShowAll("visible")
  //   }
  //   });
  const pathlist = [
    '/',
    '/life/course',
    '/life/course/cuisine',
    '/life/course/clothes',
    '/life/course/life',
    '/life/course/limit',
    '/life/course/new',
    '/life/course/anti',
    '/life/courseDetail',
  ]
  const pathnames = ['首頁', '所有課程', '抹の食', '抹の著', '抹の生活', '期間限定', '手摘專屬體驗', '防疫限定', 
  '課程列表', 
]

  // 先找出對應的中文詞
  let locationPathname = props.location.pathname


  console.log(props)
  // `/product/xxxx` 轉為 `/product`
  // if (locationPathname.includes('/course')) locationPathname = '/course'
  // if (locationPathname.includes('/cuisine')) locationPathname = '/cuisine'

  const index = pathlist.findIndex((v) => v === locationPathname)

// console.log(locationPathname)


const allcourse = (
  <>
  <ol
   className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/life">首頁</Link>
          </li>
          <li 
          className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
  </>
)

const two = (
  <>
  <ol 
  // style={{visibility : 'hidden'}}
  className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/life">首頁</Link>
          </li>
          <li 
            className="breadcrumb-item">
          <a 
          href="/life/course?categoryId=26"
          >所有課程</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
     </>
)

const detail = (
  <>
  <ol
   className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/life">首頁</Link>
          </li>
          <li 
            className="breadcrumb-item">
          <a 
          href="/life/course"
          >課程列表</a>
          </li>
          <li 
          className="breadcrumb-item active" aria-current="page">
            商品內容
          </li>
        </ol>
  </>
)




let display;

if(props.location.pathname =="/life/course"){
  display = allcourse
}else{
  display = two
}

if(props.location.pathname =="/life/courseDetail"){
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
