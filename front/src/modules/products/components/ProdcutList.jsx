import { Card, Col } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProdcutList = ({ product, key }) => {

  const navigate = useNavigate();

  const redictProduct = async (product) => {
    navigate(`${product.Id}`)
  }

  return (
    <Col
      xs={24}
      md={10}
      lg={5}
      key={key}
      onClick={() => redictProduct(product)}
      className=''
    >
      <Card
        className='cursor-pointer hover:shadow-lg min-h-[200px]'
        title={<h3 className='text-[#00bdc5]'>{product.name}</h3>} bordered={false}
      >
        <p className='text-wrap'>{product.description}</p>

      </Card>
    </Col>
  )
}
