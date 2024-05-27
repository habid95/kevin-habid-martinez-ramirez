import HttpClient from "../../../../http/http"

const HttpService = new HttpClient()

const requestLogin = async (datos) => {
    return HttpService.post('auth', datos)
}

const requestRegister = async (datos) => {
    return HttpService.post('user', datos)
}

const requestValidateToken = async () => {
    return HttpService.get('auth/validateToken')
}

export {
	requestLogin,
    requestRegister,
    requestValidateToken,
}

