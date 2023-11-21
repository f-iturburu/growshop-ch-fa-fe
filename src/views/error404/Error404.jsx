import React from 'react'
import { Button, Result, Flex } from 'antd';

export const Error404 = () => {
  return <>
  <Flex className='body-bg' style={{minHeight:"80vh"}} justify='center' align='center'>
    <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, no hemos encontrado lo que buscabas"
    extra={<Button type="primary" href='/'>Volver al inicio</Button>}
  />
  </Flex>
  </>
}
