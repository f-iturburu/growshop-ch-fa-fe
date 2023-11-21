import React, { useEffect, useState } from 'react'
import { SearchInputs } from '../../components/searchInputs/SearchInputs'
import { ProductCard } from '../../components/productCard/ProductCard'
import { Flex, Row, Spin } from 'antd'
import axios from 'axios'

export const Home = ({URL}) => {
 const [products, setProducts] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [name, setName] = useState()
  const [spinning, setSpinning] = useState(false);
  const [renderError, setRenderError] = useState(false)

 useEffect(()=>{
  fetchProducts()
 },[category, price, name])

 const fetchProducts = async () =>{
  setSpinning(true)
  let queryString = "?"
   
  if (category) {
    console.log(category);
    queryString.length == 1 ?  queryString += `category=${category}` : queryString += `&category=${category}`
  }

  if (price) {
    queryString.length == 1 ? queryString += `price=${price}` : queryString += `&price=${price}`
  }

  if (name) {
    queryString.length == 1 ? queryString += `name=${name}` : queryString += `&name=${name}`
  }

  try {
    const res = await axios.get(`${URL}/products${queryString}`)
    const data = res.data

    if (res.status == 200) {
      setProducts(data)
    }

    if (data?.length == 0) {
      setProducts(null)
      setRenderError(true)
    }

  } catch (error) {
    setProducts(null)
    setRenderError(true)
  }finally{
    setSpinning(false)
  }
  
 }
 

  return <>
  <div className={"body-bg"} style={{paddingTop: "10vh" ,width: '100%'}}>
 <SearchInputs setCategory={setCategory} setPrice={setPrice} setName={setName}/>
 <Flex justify='center' align='center'  style={{height:'80vh', width: '100%'}}>
   <Row gutter={16}> 
      {products ? products.map((product, index) => <ProductCard key={index} product={product}/>) : ""}
   </Row>
 </Flex>
 <Spin spinning={spinning} fullscreen />
  </div>
  </>
}
