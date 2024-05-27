import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestGetProductById } from '../service/api/productsRequests'
import { CustomModal } from '../../modal/Modal'
import { ShipRate } from '../components/ShipRate'

export const OneProduct = () => {

  let params = useParams()
  const [products, setProducts] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async () => {
    let response = await requestGetProductById(params.Id)

    if (response.ok) {
      setProducts(response.data)
    }
  }

  return (
    <div
      className="w-full h-[100vh] bg-[#f5f5f5] flex justify-center items-center"
    >
      {
        products &&
        <div
          className=''
        >
          <h3 className='py-5 text-center text-2xl font-bold uppercase text-[#00bdc5]'>{products.name}</h3>
          <p className='pb-16'>{products.description}</p>

          <button
            className='py-16 inline-block bg-[#12b4ba] rounded border-2 w-full pb-[8px] pt-2 text-base font-medium text-white transition duration-150 ease-in-out  hover:bg-[#00659b]'
            onClick={() => setIsModalOpen(true)}
          >
            Comprar
          </button>
        </div>
      }



      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        content={<ShipRate porduct={products} setIsModalOpen={setIsModalOpen} />}
      />

    </div>
  )
}
