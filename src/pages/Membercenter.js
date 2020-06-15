import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"

import { withRouter } from "react-router-dom"
import MemberListShow from "../components/MemberListShow"
import Editpassword from "../components/Editpassword"

function Membercenter() {
  const [member, setMember] = useState("")
  const [isedit, setIsedit] = useState(false)
  const [ischangepwd, setIschangepwd] = useState(false)

  async function getData() {
    const request = new Request("http://localhost:3002/membercenter/list", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setMember(data[0])
  }
  
  useEffect(() => {
    getData()
  }, [])

  async function updateMemberToSever(item, successCallback = () => {}) {
    // 開啟載入指示
    // setDataLoading(true)

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:3002/membercenter/edit", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })

    console.log("After JSON: ", JSON.stringify(item))

    const response = await fetch(request)
    const data = await response.json()

    // console.log('伺服器回傳的json資料', data)
    // 要等驗証過，再設定資料(簡單的直接設定)

    // if (data.id) {
    //   successCallback()
    //   console.log('call successCallback')
    // }
  }
  
  const handleEditedSave = (member) => {
    const newMember = member
    updateMemberToSever(newMember)
    setIsedit(!isedit)
    setMember(newMember)
    alert("儲存成功")
  }

  return (
    <>
      
      {ischangepwd ? (
        <Editpassword
          member={member}
          setMember={setMember}
          ischangepwd={ischangepwd}
          setIschangepwd={setIschangepwd}
        />
      ) : (
        <MemberListShow
        member={member}
        setMember={setMember}
        isedit={isedit}
        setIsedit={setIsedit}
        handleEditedSave={handleEditedSave}
        ischangepwd={ischangepwd}
        setIschangepwd={setIschangepwd}
      />
      )}
    </>
  )
}

export default Membercenter
