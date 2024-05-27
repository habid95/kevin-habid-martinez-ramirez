import React, { useEffect, useState } from 'react'
import { httpGenerateShipsRate, httpGetShipRate, requestStates, requestZipCode } from '../service/api/productsRequests'
import { Button, Col, Form, Input, InputNumber, Row, Select, notification } from 'antd'
import { CustomModal } from '../../modal/Modal'

export const ShipRate = ({ setIsModalOpen, porduct }) => {

  const [states, setStates] = useState([])
  const [form] = Form.useForm();
  const [dataBuy, setDataBuy] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [isGenerate, setIsGenerate] = useState()



  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onChangeZipCode = async (zipCode) => {

    if (zipCode && zipCode.toString().length == 5) {
      let response = await requestZipCode(zipCode)

      let data = response[0]

      setStates(data)

      form.setFieldsValue({
        state: data?.state?.name ? data?.state?.name : '',
        city: data?.locality ? data?.locality : ''
      })

    }


  }

  const formSucces = async (datos) => {
    let destination = {
      street: datos.street,
      number: datos.number,
      district: '',
      city: datos.city,
      state: states.state.code['2digit'],
      category: 1,
      country: 'MX',
      postalCode: datos.zipCode,
      reference: ''

    }

    let response = await httpGetShipRate({ destination, idProduct: porduct.Id })

    if (response.ok) {
      setDataBuy({ destination, idProduct: porduct.Id })
      const { data } = response.data
      const { deliveryEstimate, totalPrice } = data[0]
      setTotalPrice(totalPrice)
      
      notification['success']({
        message: 'Cotizacion con exito',
        description: `total a pagar:${totalPrice}`,
      });
    }


  }

  const buyProduct = async () => {
    let response = await httpGenerateShipsRate(dataBuy)

    if (response.ok) {

      const { data } = response.data
      const { carrier, service, trackingNumber, trackUrl, label } = data[0];

      setIsGenerate({ carrier, service, trackingNumber, trackUrl, label })

      notification['success']({
        message: 'Se a generado con exito el envio',
        description: `su pedido fue enviado por ${carrier} ${service} con el numero de guia ${trackingNumber}`,
      });

    }

  }


  return (
    <div className='w-full'>

      <h3 className='text-[#00bdc5] text-center text-2xl pt-5 '>Datos de envio</h3>
      <Form
        onFinish={formSucces}
        form={form}
        name='formulario'
        layout="vertical"
      >

        <Row
          className='flex  pt-8'
          style={{ width: '100%' }}
        >
          <Col style={{}} className='m-4 ' xs={18} md={10} xl={8}>

            <Form.Item
              name="street"
              label="Direccion"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Tu direccion es requerido'
                },
              ]}
            >
              <Input />
            </Form.Item>

          </Col>


          <Col style={{}} className='m-4 ' xs={8} md={10} xl={8}>

            <Form.Item
              name="number"
              label="Numero"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Numero de casa es requerido'
                },
              ]}
            >
              <InputNumber style={{ textTransform: 'uppercase' }} />
            </Form.Item>

          </Col>
        </Row>

        <Row
          className='flex'
          style={{ width: '100%' }}
        >
          <Col style={{}} className='m-4 ' xs={18} md={10} xl={8}>

            <Form.Item
              name="zipCode"
              label="Codigo Postal"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Codigo postal es requerido'
                },
              ]}
            >
              <InputNumber
                min={5}
                maxLength={5}
                onChange={onChangeZipCode} />
            </Form.Item>

          </Col>

          <Col style={{}} className='m-4 ' xs={18} md={10} xl={8}>

            <Form.Item
              name="state"
              label="Estado"
              type="text"
            >
              <Input disabled />
            </Form.Item>

          </Col>


        </Row>

        <Row
          className='flex'
          style={{ width: '100%' }}
        >
          <Col style={{}} className='m-4 ' xs={18} md={10} xl={8}>

            <Form.Item
              name="city"
              label="ciudad"
              type="text"
            >

              <Input disabled />
            </Form.Item>

          </Col>

        </Row>

        <Row>

          <Col style={{}} className='m-4 ' xs={18} md={18} xl={8}>
            {
              totalPrice > 0 &&
              <div>
                <h3>Total a pagar: {totalPrice}</h3>
              </div>
            }
          </Col>
        </Row>

        <Row
          className='pl-4 gap-3'
          style={{ width: '100%' }}
        >
          <Col xs={10} md={4} xl={4}  >
            <Form.Item
              style={{ width: '100%' }}
            >
              <Button
                type="button"
                style={{ height: '100%' }}
                onClick={closeModal}
                className="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cancelar

              </Button>
            </Form.Item>
          </Col>

          <Col xs={10} md={4} xl={4}  >
            <Form.Item
              style={{ width: '100%' }}
            >
              <Button
                type="button"
                style={{ height: '100%' }}
                htmlType="submit"
                className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cotizar

              </Button>
            </Form.Item>
          </Col>

          {
            totalPrice > 0 &&
            <Col xs={10} md={4} xl={4}  >
              <Form.Item
                style={{ width: '100%' }}
              >
                <Button
                  type="button"
                  style={{ height: '100%' }}
                  onClick={buyProduct}
                  className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Generar envio
                </Button>
              </Form.Item>
            </Col>
          }

        </Row>




      </Form>
      {/* su pedido fue enviado por ${carrier} ${service} con el numero de guia ${trackingNumber} */}
      {
        isGenerate.service &&
        <div>
          <h3>Envio generadooo por {isGenerate.service}</h3>
          <h3>Numero de guia: {isGenerate.trackingNumber}</h3>
          <a
            href={isGenerate.trackUrl}
            target="_blank"
            className='pr-4 text-gray-800 underline'
          >Ver estado de envio</a>

          <a
            className='pr-4 text-gray-800 underline'
            href={isGenerate.label}
            target="_blank"
          >Descargar PDF</a>
        </div>
      }

    </div>
  )
}
