import React, { useState, useEffect } from 'react'
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'

function App() {
  const [todos, setTodos] = useState(['買牛奶', '買iphone'])
  const [item, setItem] = useState('')

  return (
    <>
      <MyNavbar />
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">待辨事項</h1>
          <hr />
          <div>
            {/* 可控表單元素必要條件: 
                1. value對應state值
                2. onChange事件對應setState(setXXX)改變值的方法 */}
            <input
              type="text"
              value={item}
              onChange={(event) => {
                setItem(event.target.value)
              }}
              onKeyPress={(event) => {
                // 處理按下 Enter鍵
                if (event.key === 'Enter' && event.target.value !== '') {
                  // 建立新的todos陣列
                  const newTodos = [event.target.value, ...todos]

                  // 設定新的todos，變動呈現的列表
                  setTodos(newTodos)

                  // 清空文字輸入框
                  setItem('')
                }
              }}
            />
          </div>
          <div>
            <ul>
              {todos.map((value, index) => {
                // 列表項目(子元素)需要唯一的key值(id值的意思)
                return <li key={index}>{value}</li>
              })}
            </ul>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  )
}

export default App
