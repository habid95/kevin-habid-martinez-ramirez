import React, { useState } from 'react'
import { MdOutlineMail } from "react-icons/md";
import { Register } from '../components/Register';
import { Login } from '../components/Login';

export const LoginPage = () => {


    const [login, setLogin] = useState(true)


    const forgotPassword = () => {
        setLogin(!login)
    }

    return (
        <div className="w-full h-[100vh] bg-white ">
            <div className="h-full">
                <div className="g-0 lg:flex lg:flex-wrap h-full">
                    {/* <!-- Left column container--> */}
                    <div className="px-4 md:px-0 lg:w-6/12">
                        <div className="md:mx-6 md:p-12">
                            <div className="text-center">
                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                    Envia.com
                                </h4>
                            </div>

                            {
                                login ?
                                    <Login forgotPassword={forgotPassword}/>
                                    :
                                    <Register forgotPassword={forgotPassword}/>

                            }

                        </div>
                    </div>

                    <div className='bg-[#dae9eb] hidden lg:w-6/12 lg:flex'>
                        <img className='max-w-full ' src="https://accounts-pro.s3.amazonaws.com/images/login/envia/es-MX.png" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}
