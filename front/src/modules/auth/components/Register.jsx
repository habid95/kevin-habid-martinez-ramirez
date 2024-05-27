import React, { useState } from 'react'
import { requestRegister } from '../service/api/request'
import { notification } from 'antd';


export const Register = ({ forgotPassword }) => {

    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')


    const register = async (e) => {
        e.preventDefault()
        let response = await requestRegister({ name: nombre, phone: telefono, Password:password })

        if (response.ok) {
            notification['success']({
                message: 'Registro con exito',
                description: 'Por favor, inicia sesion',
            });
        } else {

            notification['warning']({
                message: 'Error al registrarte',
                description: 'Por favor, intenta de nuevo',
            });
        }
    }
    return (
        <form onSubmit={register}>
            <h2 className="mb-4 text-[#00bdc5] text-3xl font-bold">Registrate</h2>
            <div className='mb-6 mt-10'>
                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>

                <input
                    type="text"
                    id="nombre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="kevin"
                    required
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='mb-6 mt-10'>
                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">telefono</label>

                <input
                    type="text"
                    id="telefono"
                    pattern="[1-9]{1}[0-9]{9}"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="3352697836"
                    required
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="•••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>



            <div className="mb-12 pb-1 pt-1 text-center">
                <div className="w-full">
                    <button
                        className='inline-block bg-[#12b4ba] rounded border-2 w-full pb-[8px] pt-2 text-base font-medium text-white transition duration-150 ease-in-out  hover:bg-[#00659b]'
                        type="submit"
                    >
                        Registrate
                    </button>
                </div>

            </div>


            <div className="flex items-center pb-6 text-gray-500">
                Tengo cuenta!
                <p
                    onClick={forgotPassword}
                    className="pl-2 text-blue-600 font-semibold hover:underline"
                >
                    Inisiar sesion
                </p>
            </div>

        </form>
    )
}
