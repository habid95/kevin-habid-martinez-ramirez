import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LocalStorageKeys, getInLocalStorage } from './sesion-storage'
import { requestValidateToken } from '../service/api/request'

export const ProtectedRoute = () => {
  const [isLoading, setisLoading] = useState(true)
  const [isauthenticate, setisauthenticate] = useState(false)

  const validateToken = async () => {
    const token = getInLocalStorage(LocalStorageKeys.TOKEN)

    if (!token) {
      setisLoading(false)
      return
    }

    try {

      let response = await requestValidateToken()
      if (response.ok) {
        setisauthenticate(true)
      }
    } catch (error) {
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <>
      {isLoading
        ? (
          <> cargandi..... </>
        )
        : isauthenticate
          ? (
            <Outlet />
          )
          : (
            <Navigate to='/login' />
          )}
    </>
  )
}
