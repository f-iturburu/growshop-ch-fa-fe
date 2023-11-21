import React, { useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";
import { Card, Col, Tooltip, notification, message, Spin  } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import axios from "axios";

const { Meta } = Card;

export const ProductCard = ({ product, productsQuantity, setProductsQuantity, URL }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [messageApi, contextHolder] = message.useMessage();
  const [api, apiContextHolder] = notification.useNotification();
 const [loading,setLoading] = useState()

  const addToCartHandler = async (product) => {
    try {
      setLoading(true)
      const res = await axios.post(`${URL}/cart/${product._id}`, {id: product._id}, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },
      });
     
      const data = res.data

      if (res.status == 200) {
        api.open({
          message: product.name,
          description: "Se ha agregado exitosamente a tu carrito!",
          duration: 2,
        });
  
        setProductsQuantity(++ productsQuantity)
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Algo salio mal intenta de nuevo mas tarde",
      });
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      {contextHolder}
      {apiContextHolder}
      <Col xs={24} sm={24} md={12} lg={6} style={{marginTop: 16, marginBottom: 16}}>
        <Card
          hoverable
          cover={<img alt={product.name} src={product.images[0]} />}
          actions={[ loading ? <Spin /> :
            <Tooltip title="Agregar al carrito">
              <PlusOutlined
                key="setting"
                onClick={() => addToCartHandler(product)}
              />
            </Tooltip>,
            <>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <DollarOutlined /> {formatCurrency(product.price)}{" "}
              </span>
            </>,
          ]}
          style={{ height: "100%" }}
        >
          <Meta title={product.name} description={product.description} />
        </Card>
      </Col>
    </>
  );
};
