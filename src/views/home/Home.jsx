import React, { useEffect, useState } from 'react'
import { SearchInputs } from '../../components/searchInputs/SearchInputs'
import { ProductCard } from '../../components/productCard/ProductCard'
import { Flex, Row, Spin, Result } from 'antd'
import axios from 'axios'

export const Home = ({URL, productsQuantity, setProductsQuantity}) => {
 const [products, setProducts] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [name, setName] = useState()
  const [spinning, setSpinning] = useState(false);


 useEffect(()=>{
  fetchProducts()
 },[category, price, name])

 const fetchProducts = async () =>{
  setSpinning(true)
  let queryString = "?"
   
  if (category) {
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
    }

  } catch (error) {
    setProducts(null)
  }finally{
    setSpinning(false)
  }
  
 }
 

  return <>
  <div className={"body-bg"} style={{paddingTop: "10vh" ,width: '100%'}}>
 <SearchInputs setCategory={setCategory} setPrice={setPrice} setName={setName}/>
 <Flex justify='center' align='center'  style={{width: '100%'}}>
 <Flex justify='center' align='center'  style={{minHeight:'80vh', width: '90%'}}>
   <Row gutter={16} >  
      {products ? products.map((product, index) => <ProductCard key={index} product={product} productsQuantity={productsQuantity} setProductsQuantity={setProductsQuantity} URL={URL}/>) :     <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, no hemos encontrado lo que buscabas"
  />}
   </Row>
 </Flex>

 </Flex>
 <Spin spinning={spinning} fullscreen />
  </div>
  </>
}
