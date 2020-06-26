import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Items from '../components/Items'
import CategoryBar from '../components/CategoryBar'

import '../components/courses/courses-style.css'

import bgSvg from '../components/bg-pattern.svg'
import ProductListBg from './ProductListBg'
import { func } from 'prop-types'

function ProductList(props) {

  useEffect(()=> {
    props.changeBackgroundColorLight()
  },[])

  return (
    <>
      <div style={{ backgroundImage: `url(${bgSvg})` }} className="bgSvg">
        <ProductListBg />
      </div>
      <Container className="d-flex justify-content-center mt-5">
        <CategoryBar className="w-25" />
        <Items />
      </Container>
    </>
  )
}

export default ProductList
