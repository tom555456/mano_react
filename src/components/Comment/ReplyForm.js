import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

function ReplyForm(props) {
  //   const [editText, setEditText] = useState(props.value.text)
  //   const [editUser, setEditUser] = useState(props.value.username)

  //console.log('EditForm',props)
  // 先解構賦值，直接套用由props得到的變數值
  const { value, handleEditSave, updateComToServer } = props
  //   console.log(addNewTodoItemToSever)
  const {
    replyCom,
    setReplyCom,
    replyText,
    setReplyText,
    replyUser,
    setReplyUser,
  } = props
  console.log(value)
  const date = new Date()
  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'

  const addNewReplyItemToSever = async (item) => {
    const request = new Request('http://localhost:3002/comment', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log(item)
    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料', data)
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="form-group">
        <label htmlFor="todoInput">回覆{value.username}留言</label>
        <label htmlFor="todoInput">: {value.text} </label>
        <input
          id="todoUser"
          className="form-control mb2"
          type="text"
          value={replyUser}
          placeholder="姓名"
          onChange={(event) => {
            setReplyUser(event.target.value)
          }}
        />
        <textarea
          id="todoEdit"
          className="form-control"
          type="text"
          value={replyText}
          placeholder="輸入完請按enter"
          onChange={(event) => {
            setReplyText(event.target.value)
          }}
        />
        <h1>
          {' '}
          {replyUser}
          {replyText}{' '}
        </h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={(event) => {
            const newComItem = {
              id: +new Date(),
              username: replyUser,
              text: replyText,
              edited: 0,
              completed: 0,
              heart: 0,
              parentReply: value.cid,
            }
            setReplyCom([newComItem, ...replyCom])
            addNewReplyItemToSever(newComItem)
          }}
        >
          Post
        </Button>
      </div>
    </li>
  )
}
export default ReplyForm
