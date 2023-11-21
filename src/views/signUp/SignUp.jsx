import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message, Typography } from 'antd';
import { runes } from 'runes2';
import axios from 'axios';
const { Title } = Typography;

export const SignUp = ({URL}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();


  const onFinish = async (values) => {
   
    try {
      setLoading(true)
      const res = await axios.post(`${URL}/user`,{
        email: values.email,
        username: values.username,
        password: values.password
      })
  
      if (res.status == 201) {
        const data = res.data;
        localStorage.setItem("token", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
        console.log(error);
      if (error?.response?.status == 400 || error?.response?.status == 401) {
        return messageApi.open({
            type: 'error',
            content: error?.response?.data?.message,
          });
      }

      messageApi.open({
        type: 'error',
        content: 'Algo salio mal intenta de nuevo mas tarde',
      });

    } finally{
      setLoading(false)
    }
  };
  
    return <>
     {contextHolder}
    <div className='body-bg'>
      <Flex justify='center' align='center'  style={{height:'80vh', width: '100%'}}>
      <Form
      name="normal_login"
      className="login-form"
      style={{backgroundColor: "white", padding: "3%", borderRadius: "25px"}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
       <Title style={{textAlign:"center"}}>Registro</Title>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'El email ingresado es invalido',
          },
          {
            required: true,
            message: 'Ingrese un email',
          },
        ]}
      >
        <Input 
        prefix={<MailOutlined className="site-form-item-icon/" /> }
        />
      </Form.Item>

      <Form.Item
        name="username"
        label="Nombre de usuario"
        tooltip="Su nombre de usuario debe ser de entre 6 y 15 caracteres, no se permiten espacios ni caracteres especiales."
        rules={[{ required: true, message: 'Ingrese un nombre de usuario', whitespace: true}, {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Ingrese un nombre de usuario valido',
        }]}
      >
        <Input 
        prefix={<UserOutlined className="site-form-item-icon" />}
           count={{
            max: 15,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        tooltip= "Su contraseña debe ser de un minimo de 8 caracteres y debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales."
        rules={[
          {
            required: true,
            message: 'Ingrese una contraseña',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Ingrese una contraseña valida'
          },
        ]}
        hasFeedback
      >
        <Input.Password 
         prefix={<LockOutlined className="site-form-item-icon" />}
          count={{
            max: 30,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Repetir contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Ingrese una contraseña',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden!'));
            },
          }),
        ]}
      >
        <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              count={{
                max: 15,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
              }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Registrarme
        </Button>
      </Form.Item>
    </Form>
      </Flex>

    </div>
    </>
}
