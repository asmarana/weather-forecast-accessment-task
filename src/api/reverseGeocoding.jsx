import axios from 'axios';

const FetchCityEndPoint = params => `https://nominatim.openstreetmap.org/reverse?format=${params.format}&lat=${params.latitude}&lon=${params.longitude}&accept-language=${params.language}`

const apiCall = async (endPoint) => {
    const options = {
        method: 'GET',
        url: endPoint,
    }
    try {
        const response = await axios.request(options);
        return response.data;

    } catch (err) {
        console.log('Error', err)
        return null
    }
}

export const fetchCity = params => {
    return apiCall(FetchCityEndPoint(params));
}