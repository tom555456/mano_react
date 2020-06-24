import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"
import MemberSideLink from "./MemberSideLink"
import ItemTracking from "./ItemTracking/ItemTracking"


function MemberItemtrack(props) {
  const { member,setMember, isedit, setIsedit,handleEditedSave,ischangepwd, setIschangepwd,handleImgSave,localMember } = props
  function changeBackgroundColorLight(){
    document.body.style.background ='url(/bg-dark-with-pattern.svg) repeat'

  }
  return (
    <>
      <MemberSideLink>
        <Col md={10}>
        <ItemTracking changeBackgroundColorLight={changeBackgroundColorLight}/>
        </Col>
      </MemberSideLink>
    </>
  )
}
export default MemberItemtrack