import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"
import Items from "../components/Items";
import CategoryBar from "../components/CategoryBar";

function ProductList(props) {

  useEffect(()=>{
    props.changeBackgroundColorLight()
  },[])
  
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
          <CategoryBar className="w-25" />
          <Items />
      </Container>
    </>
  )
}

export default ProductList
