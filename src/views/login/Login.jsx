import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message, Typography } from 'antd';
import { runes } from 'runes2';
import axios from 'axios';
const { Title } = Typography;

export const Login = ({URL}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const onFinish = async (values) => {   
    try {
      setLoading(true)
      const res = await axios.post(`${URL}/login`,{
        user: values.user,
        password: values.password
      })
 
      if (res.status == 200) {
        const data = res.data;
        localStorage.setItem("token", JSON.stringify(data));
        navigate("/");
      }else{
        messageApi.open({
          type: 'error',
          content: 'El email, nombre de usuario o contraseña ingresados son incorrectos',
        });
      }
    } catch (error) {
      if (error.response.status == 418) {
        return messageApi.open({
          type: 'error',
          content: 'El email, nombre de usuario o contraseña ingresados son incorrectos',
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
      <Flex justify='center' align='center' style={{height:'80vh', width: '100%'}}>
      <Form
      name="normal_login"
      className="login-form"
      style={{backgroundColor: "white", padding: "3%", borderRadius: "25px"}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
       <Title style={{textAlign:"center"}}>Ingresar</Title>
      <Form.Item
        name="user"
        rules={[{ required: true, message: 'Ingrese un email o nombre de usuario.' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email o nombre de usuario"    count={{
            max: 30,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Ingrese una contraseña!'}]}
        
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
          count={{
            max: 30,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
          Ingresar
        </Button>
      </Form.Item>
      <Form.Item>
        No tienes una cuenta?<a href="/signUp"> Registrate ahora!</a>
      </Form.Item>
    </Form>
      </Flex>

    </div>
    </>
}
