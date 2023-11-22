import React, { useEffect, useState } from "react";
import { SearchInputs } from "../../components/searchInputs/SearchInputs";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Flex, Row, Spin, Result, Pagination } from "antd";
import axios from "axios";

export const Home = ({ URL, productsQuantity, setProductsQuantity }) => {
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [spinning, setSpinning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    fetchProducts();
  }, [category, price, name]);

  const fetchProducts = async () => {
    setSpinning(true);
    let queryString = "?";

    if (category) {
      queryString.length == 1
        ? (queryString += `category=${category}`)
        : (queryString += `&category=${category}`);
    }

    if (price) {
      queryString.length == 1
        ? (queryString += `price=${price}`)
        : (queryString += `&price=${price}`);
    }

    if (name) {
      queryString.length == 1
        ? (queryString += `name=${name}`)
        : (queryString += `&name=${name}`);
    }

    try {
      const res = await axios.get(`${URL}/products${queryString}`);
      const data = res.data;

      if (res.status == 200) {
        setProducts(data);
      }

      if (data?.length == 0) {
        setProducts(null);
      }
    } catch (error) {
      setProducts(null);
    } finally {
      setSpinning(false);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={"body-bg"} style={{ paddingTop: "10vh", width: "100%" }}>
        <SearchInputs
          setCategory={setCategory}
          setPrice={setPrice}
          setName={setName}
        />
        <Flex justify="center" align="center" style={{ width: "100%" }}>
          <Flex
            justify="center"
            align="center"
            style={{ minHeight: "80vh", width: "90%" }}
          >
            <Row gutter={16}>
              {products ? (
                products
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((product, index) => (
                    <ProductCard
                      key={index}
                      product={product}
                      productsQuantity={productsQuantity}
                      setProductsQuantity={setProductsQuantity}
                      URL={URL}
                    />
                  ))
              ) : (
                <Result
                  status="404"
                  title="404"
                  subTitle="Lo sentimos, no hemos encontrado lo que buscabas"
                />
              )}
            </Row>
          </Flex>
        </Flex>
        <Flex
          justify="center"
          align="center"
          style={{ width: "100%", marginTop: 5, marginBottom: 15 }}
        >
          <Pagination
            style={{ marginTop: 5, marginBottom: 15 }}
            current={currentPage}
            onChange={handleChangePage}
            total={products?.length}
            pageSize={pageSize}
          />
        </Flex>
        <Spin spinning={spinning} fullscreen />
      </div>
    </>
  );
};
