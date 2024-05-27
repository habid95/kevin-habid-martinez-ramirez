import React, { useEffect } from 'react'
import { ProdcutList } from '../components/ProdcutList'
import { Row, Space } from 'antd'
import { requestGetProducts } from '../service/api/productsRequests'
import { useState } from 'react'

export const Product = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getListOfProducts()
  }, [])

  const getListOfProducts = async () => {
    const response = await requestGetProducts()
    if (response.ok) {
      setProducts(response.data)
    } else {

    }

    setTimeout(() => {
      setLoading(false)
    }, 2000);

  }


  return (
    <div
      className='w-full min-h-[100vh] bg-[#f5f5f5]'
    >
      <div className='text-center py-7 text-[#00bdc5] text-3xl'>
        <h2>Listado de productos</h2>
      </div>

      {
        loading
          ?
          <p>Cargando...</p>
          :
          products.length === 0
            ?
            <>No existen productos</>
            :
            <div className='w-full'>
              <Row
                key="list-products"
                className='w-full px-8 gap-4 md:gap-10 lg:gap-8 flex justify-around'
              >
                {
                  products.map(product => (
                    <ProdcutList product={product} key={product.id} />
                  ))
                }
              </Row>
            </div>
      }
    </div>
  )
}
