import React, { useState, useEffect } from 'react'

function Cart() {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  // 模擬componentDidMount
  useEffect(() => {
    // 開啟指示(spinner)
    setDataLoading(true)

    console.log(localStorage.getItem('cart'))

    // 得到值(字串) !!重要
    const initCart = localStorage.getItem('cart') || '[]'
    // 設定到mycart，轉為真正的陣列 !!重要
    setMycart(JSON.parse(initCart))

    // 1000ms(一秒後)關閉指示(spinner)
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [])

  // 模擬componentDidUpdate
  useEffect(() => {
    //console.log(mycart)
    let newMycartDisplay = []

    //console.log('mycartDisplay', mycartDisplay)
    console.log('mycart', mycart)

    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )

      //有的話就數量+1
      if (index !== -1) {
        //console.log('findindex', index)
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    console.log('newMycartDisplay', newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  // 計算總價用的函式
  function sum(items) {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }

  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )

  const display = (
    <>
      <ul className="list-group">
        {mycartDisplay.map((value, index) => {
          return (
            <li className="list-group-item" key={value.id}>
              產品：{value.name}/數量：{value.amount} /單價：{value.price}/
              {'   '}
              小計：{value.amount * value.price}
            </li>
          )
        })}
      </ul>
      {/* 判斷mycartDisplay是否在初次render的階段 */}
      {mycartDisplay.length > 0 ? <h3>總價：{sum(mycartDisplay)}</h3> : ''}
    </>
  )

  return (
    <>
      <div className="container">{dataLoading ? spinner : display}</div>
    </>
  )
}

export default Cart
