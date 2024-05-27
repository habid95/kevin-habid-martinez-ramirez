import HttpClient from "../../../../http/http"

const HttpService = new HttpClient()

const requestGetProducts = async () => {
    return HttpService.get('products')
}

const requestGetProductById = (id) => {
    return HttpService.get(`products/${id}`)
}

const requestStates = () => {
    return HttpService.get('state?country_code=mx','','envia')
}

const requestZipCode = async (zipcode) => {
    return HttpService.get(`zipcode/mx/${zipcode}`,'','envia-geo')
}



const httpGetShipRate = (data) => {
    return HttpService.post('ships/rate',data,'local')
}

const httpGenerateShipsRate = (data) => {
    return HttpService.post('ships/generate',data,'local')
}

export {
	requestGetProducts,
    requestGetProductById,
    requestStates,
    requestZipCode,
    httpGetShipRate,
    httpGenerateShipsRate
}