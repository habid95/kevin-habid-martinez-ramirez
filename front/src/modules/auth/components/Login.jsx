import React, { useState } from 'react'
import { requestLogin } from '../service/api/request'
import { notification } from 'antd'
import { LocalStorageKeys, setInLocalStorage } from '../utils/sesion-storage'
import { useNavigate } from "react-router-dom";

export const Login = ({forgotPassword}) => {

    
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')

    
  const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault()
        let response = await requestLogin({ name: nombre, Password:password })
        
        if (response.ok) {
            setInLocalStorage(LocalStorageKeys.TOKEN, response.token)
            notification['success']({
                message: 'Inicio de sesion con exito',
                description: `Bienvenido ${nombre} a Envia`,
            });
            navigate('/products')
        } else {
            notification['warning']({
                message: 'Error al iniciar secion',
                description: 'Por favor, valida tus datos',
            });
        }
    }

    return (
        <form onSubmit={register}>
            <h2 className="mb-4 text-[#00bdc5] text-3xl font-bold">Iniciar sesion</h2>
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
                        Iniciar sesion
                    </button>
                </div>

            </div>


            <div className="flex items-center pb-6 text-gray-500">
                ¿Aun no tienes una cuanta?
                <p
                    onClick={forgotPassword}
                    className="pl-2 text-blue-600 font-semibold hover:underline"
                >
                    Registrate
                </p>
            </div>

        </form>
    )
}
