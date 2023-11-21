import React from "react";
import { Row, Col, Typography, Flex } from "antd";
const { Link } = Typography;

const Footer = () => {
  return (
    <>
      <Row align="middle" style={{ backgroundColor: "white", width: "100%", paddingTop:"3vh", paddingBottom:"3vh" }}>
      <Col xs={24} sm={24} md={12} lg={6}>
      <Flex justify="center" align="center">
         <img src="/assets/img/logo.png" style={{height: "auto", width:"120px"}}/>
         </Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Flex vertical >
            <Link href="/404">Sobre nosotros</Link>
            <Link href="/404">Contacto</Link>
            <Link href="/404">Centro de ayuda</Link>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Flex vertical>
            <Link href="/404">Politica de privacidad</Link>
            <Link href="/404">Preferencias de cookies</Link>
            <Link href="/404">Avisos legales</Link>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Flex vertical>
            <Link href="/404">Información sobre seguros</Link>
            <Link href="/404">
              Información al usuario financiero
            </Link>
            <Link href="/404">Avisos legales</Link>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
