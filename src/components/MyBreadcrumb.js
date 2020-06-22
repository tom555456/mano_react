import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  const pathlist = [
    '/',
    '/mall/shop',
    '/mall/shop/cuisine',
    '/mall/shop/cuisine/food',
    '/mall/shop/cuisine/drinks',
    '/mall/shop/clothes',
    '/mall/shop/clothes/man',
    '/mall/shop/clothes/man/top',
    '/mall/shop/clothes/man/bottom',
    '/mall/shop/clothes/man/accessory',
    '/mall/shop/clothes/woman',
    '/mall/shop/clothes/woman/top',
    '/mall/shop/clothes/woman/bottom',
    '/mall/shop/clothes/woman/accessory',
    '/mall/shop/goods',
    '/mall/shop/goods/beauty',
    '/mall/shop/goods/beauty/makeup',
    '/mall/shop/goods/beauty/body',
    '/mall/shop/goods/beauty/fingernail',
    '/mall/shop/goods/beauty/hair',
    '/mall/shop/goods/outdoor',
    '/mall/shop/goods/house',
    '/mall/shop/goods/house/furniture',
    '/mall/shop/goods/house/others',
    '/mall/shop/delivery-free',
  ]
  const pathnames = [
    '首頁',
    '所有商品',
    '抹の食',
    '食品',
    '飲品',
    '抹の著',
    '男性',
    '上著',
    '下著',
    '飾品',
    '女性',
    '上著',
    '下著',
    '飾品',
    '抹の物',
    '美妝護膚',
    '彩妝品',
    '身體清潔',
    '指彩',
    '髮妝',
    '戶外用品',
    '家庭用品',
    '家具',
    '雜物',
    '免運專區',
  ]

  console.log(props)
  // 先找出對應的中文詞
  let locationPathname = props.location.pathname
  let secondPathname = `/mall/shop/${props.match.params.third}`
  let thirdPathname = `/${props.match.params.third}/${props.match.params.fourth}`
  let fourthPathname = `/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}`
  let fifthPathname = `/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}/${props.match.params.sixth}`

  //productList/shop/cuisine?categoryId=3
  let catUrl = `/mall/shop/${props.match.params.third}?${props.match.params.fifth}`
  let catUrl2 = `${secondPathname}/${props.match.params.sixth}`

  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/parentId=0'))
    locationPathname = '/mall/shop'

  if (locationPathname.includes('/food')) locationPathname = '/food'
  if (locationPathname.includes('/drinks')) locationPathname = '/drinks'

  console.log(`second: ${secondPathname}`)
  console.log(`third: ${thirdPathname}`)
  console.log(`four: ${fourthPathname}`)
  console.log(locationPathname)
  // if (locationPathname.includes('/clothes')) locationPathname = '/clothes'

  // if (locationPathname.includes('/goods')) locationPathname = '/goods'

  // if (locationPathname.includes('/delivery-free'))
  //   locationPathname = '/delivery-free'

  const index = pathlist.findIndex((v) => v === locationPathname)
  const secondIndex = pathlist.findIndex((v) => v === secondPathname)
  const thirdIndex = pathlist.findIndex((v) => v === thirdPathname)
  const fourthIndex = pathlist.findIndex((v) => v === fourthPathname)
  const fifthIndex = pathlist.findIndex((v) => v === fifthPathname)

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

  const two = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/productList/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[secondIndex]}
        </li>
      </ol>
    </>
  )

  const third = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/productList/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl}>{pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[thirdIndex]}
        </li>
      </ol>
    </>
  )

  const fourth = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/productList/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl}>{pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[thirdIndex]}
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[fourthIndex]}
        </li>
      </ol>
    </>
  )
  const fifth = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/productList/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl2}>{pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl2}>{pathnames[thirdIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[fourthIndex]}
        </li>
        {/* <li className="breadcrumb-item active" aria-current="page">
          商品內容
        </li>  */}
      </ol>
    </>
  )

  let display

  if (props.match.params.fourth) display = third

  if (props.match.params.fifth) display = fifth

  // if (props.match.params.fifth == 'categoryId=6') display = fourth

  if (!props.match.params.sixth) display = fourth

  if (!props.match.params.fifth) display = two

  if (!props.match.params.third) display = allcourse
  if (props.match.params.third == 'parentId=0') display = allcourse

  return (
    <>
      <nav aria-label="breadcrumb">{display}</nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)
