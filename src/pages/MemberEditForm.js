import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image,Form } from "react-bootstrap"
import areaData from "./areaData"
function MemberEditForm(props) {
  const {
    member,
    setMember,
    isedit,
    setIsedit,
    handleEditedSave,
    handleImgSave,
  } = props


  const [indexstatus, setIndexstatus] = useState(0)
  const city = areaData.map((value,index) => {
    return(
      <option key={index}value={value.city} >{value.city}</option>
  )})
  const district = areaData.map((value,index) => {
    return(
      value.district.map((area,index)=>{
        return(
          <option key={index}value={area} >{area}</option>
        )
      })
     
  )})
  function areaChange(){
    var objS = document.getElementById("pid");
    setIndexstatus(objS.selectedIndex)
    }

  return (
    <>
      <Col md={10} xs={12}>
        <Table responsive>
          <thead>
            <tr>
              <Image
                style={{ width: "50px", height: "50px" }}
                src={`./memberimgs/${member.memberImg}`}
                alt={member.memberImg}
                rounded
              />
              <th colSpan={4}>
                <Form name="form1">
                  <Form.Group>
                    <Form.File
                      id="avatar"
                      name="avatar"
                      onChange={(event) => {
                        setMember({
                          ...member,
                          memberImg:
                            Date.now() +
                            event.target.files[0].name.substr(-4, 4),
                        })
                      }}
                    />
                    
                  </Form.Group>
                  <button
                    onClick={() => {
                      handleImgSave(member)
                    }}
                  >
                    上傳新的大頭貼
                  </button>
                </Form>
                <img src="" alt="" id="myimg"></img>
              </th>
            </tr>
            <tr>
              <th>會員帳號(email)</th>
              <th>會員密碼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  id="editemail"
                  type="email"
                  value={member.email}
                  onChange={(event) => {
                    setMember({
                      ...member,
                      email: event.target.value,
                    })
                  }}
                />
              </td>
              <td>******</td>
            </tr>
          </tbody>
          <thead>
            <th>姓名</th>
            <th>聯絡電話</th>
          </thead>
          <tbody>
            <td>
              <input
                id="editmemberName"
                type="text"
                value={member.memberName}
                onChange={(event) => {
                  setMember({
                    ...member,
                    memberName: event.target.value,
                  })
                }}
              />
            </td>
            <td>
              <input
                id="editphone"
                type="text"
                value={member.phone}
                onChange={(event) => {
                  setMember({
                    ...member,
                    phone: event.target.value,
                  })
                }}
              />
            </td>
          </tbody>
          <thead>
            <tr>
              <th>住址所在地</th>
              <th>詳細地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              {member.paymentCity}{member.paymentDistrict}
              <br />
                <select id="pid" onChange={(event)=>{areaChange();
                  setMember({
                    ...member,
                    paymentCity: event.target.value,
                    paymentDistrict: "請選擇區域",
                  })
                }}>
                 {city}
                </select>
                <select onChange={(event)=>{
                  setMember({
                    ...member,
                    paymentDistrict: event.target.value,
                  })
                }}>
                  {district[indexstatus]}
                </select>
                
              </td>
              <td>
                <input
                  id="editshipAddress"
                  type="text"
                  value={member.shipAddress}
                  onChange={(event) => {
                    setMember({
                      ...member,
                      shipAddress: event.target.value,
                    })
                  }}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <th>會員等級</th>
            <th>會員加入時間</th>
          </thead>
          <tbody>
            <td>{member.class}</td>
            <td>{member.created_at}</td>
          </tbody>
        </Table>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleEditedSave(member)
            setIsedit(!isedit)
          }}
        >
          SAVE
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setIsedit(!isedit)}
        >
          取消編輯
        </button>
      </Col>
    </>
  )
}
export default MemberEditForm
