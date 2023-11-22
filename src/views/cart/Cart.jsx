import {
  MinusCircleOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  ShoppingOutlined,
  ShopOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {Space, List, Spin, Flex, Button, Tooltip, message, Typography, Divider, Result } from "antd";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Title } = Typography;


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const Cart = ({ URL, productsQuantity, setProductsQuantity }) => {
  const [data, setData] = useState();
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  console.log(data);
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setSpinning(true);
      const res = await axios.get(`${URL}/cart`, {
        headers: {
          "auth-token": token.token,
        },
      });
      if (res.status == 200) {
        const data = res.data;
        setData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSpinning(false);
    }
  };

  const addToCartHandler = async (product) => {
    try {
      setSpinning(true)
      const res = await axios.post(`${URL}/cart/${product._id}`, {id: product._id}, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },
      });
     
      if (res.status == 200) {  
        setSpinning(true)
        setProductsQuantity(++ productsQuantity)
        const data = res.data
       
        setData(data.foundCart);
      }
      
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Algo salio mal intenta de nuevo mas tarde",
      });
    }finally{
      setSpinning(false)
    }
  };

  const removeFromCartHandler = async (product) => {
    try {
      setSpinning(true)
      const res = await axios.delete(`${URL}/cart/${product._id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },
      });
     
      if (res.status == 200) {  
        setSpinning(true)
        setProductsQuantity(-- productsQuantity)
        const data = res.data
        setData(data.foundCart);
      }
      
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Algo salio mal intenta de nuevo mas tarde",
      });
    }finally{
      setSpinning(false)
    }
  };

  const purchaseHandler = async () =>{
      try {
        setLoading(true)

        const res = await axios.post(`${URL}/purchase`, {token: token.token}, {
            headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },
        })

        if (res.status == 201) {
          messageApi.open({
            type: 'success',
            content: 'Tu compra ha sido realizada exitosamente!',
          });

          setProductsQuantity(0)
          setTimeout(()=>{
            navigate("/");
          }, 3000)
        }


      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Algo salio mal intenta de nuevo mas tarde",
        });
      }finally{
        setLoading(false)
      }
  }

  return (
    <>
    {contextHolder}
        <Spin spinning={spinning} fullscreen />
        {data?.products?.length > 0 ? 
            <>
              <Flex
              className="body-bg"
        justify="center"
        align="center"
        vertical
        style={{
          marginTop: "5vh",
          marginBottom: "2vh",
          minHeight: "80vh",
          width: "100%",
        }}
      >
          <Flex justify="space-around" align="center" style={{width:"50%", marginBottom: 15}}>
         <Title level={4} style={{fontWeight: "normal"}}>Precio total: {formatCurrency(data.totalPrice)} </Title>
         <Button type="primary" icon={<ShopOutlined />} onClick={purchaseHandler} loading={loading}>Finalizar compra</Button>
            </Flex> 
          <List
          style={{backgroundColor: "white", padding: 10, borderRadius: "20px"}}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 2,
            }}
            dataSource={data.products}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <Tooltip title="Quitar producto">
                    <Button key={item._id} style={{ border: 0 }} onClick={()=> removeFromCartHandler(item)}>
                      <IconText
                        icon={MinusCircleOutlined}
                        key="list-vertical-star-o"
                      />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="Cantidad total">
                    <Button key={item._id} style={{ border: 0 }}>
                      <IconText
                        icon={ShoppingOutlined}
                        text={item.quantity}
                        key="list-vertical-message"
                      />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="Agregar producto">
                    <Button key={item._id} style={{ border: 0 }} onClick={()=>addToCartHandler(item)}>
                      <IconText
                        icon={PlusCircleOutlined}
                        key="list-vertical-star-o"
                      />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="Precio total">
                    <Button key={item._id} style={{ border: 0 }}>
                      <IconText
                        icon={DollarOutlined}
                        text={formatCurrency(item.totalPrice)}
                        key="list-vertical-like-o"
                      />
                    </Button>
                  </Tooltip>,
                ]}
                extra={<img width={272} alt="logo" src={item.images[0]} />}
              >
                <List.Item.Meta
                  title={<a href={`${item._id}`}>{item.name}</a>}
                />
                {item.description}
              </List.Item>
            )}
          />
          
          </Flex>
        </> : (
           <Result
           status="404"
           title="Vaya, parece que tu carrito está vacio!"
           subTitle="Agrega productos a tu carrito para efectuar una combra"
         />
        )}

    </>
  );
};
