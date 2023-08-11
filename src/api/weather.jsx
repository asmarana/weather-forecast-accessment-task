import axios from 'axios';
import { API_KEY } from '../constants/APIs';

const ForecsatEndPoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`


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

export const fetchWeatherForcast = params => {
    return apiCall(ForecsatEndPoint(params));
}



