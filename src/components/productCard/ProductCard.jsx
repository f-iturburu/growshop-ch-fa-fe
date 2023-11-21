import React from 'react';
import { formatCurrency } from '../../helpers/formatCurrency';
import { Card, Col, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DollarOutlined, PlusOutlined } from '@ant-design/icons';
import { icons } from 'antd/es/image/PreviewGroup';

const { Meta } = Card;


export const ProductCard = ({product}) => {
  return <>
<Col xs={24} sm={24} md={12} lg={8}>
   <Card
    hoverable
    cover={<img alt={product.name} src={product.images[0]} />}
    actions={[
      <Tooltip title="Agregar al carrito">
        <PlusOutlined key="setting" onClick={()=> console.log("Test")}/>
      </Tooltip>,
      <>
      <span style={{display: 'inline-flex', alignItems: 'center', justifyContent:"space-around", width: "100%"}}><DollarOutlined /> {formatCurrency(product.price)}  </span>
      </>
    ]}
    style={{height:"100%"}}
  >
    <Meta title={product.name} description={product.description}  />
  </Card>

</Col>
  </>
}
