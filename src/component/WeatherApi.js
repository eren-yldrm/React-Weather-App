import axios from "axios";

const API_KEY = "effde2391acd35e139e9a2df4cf810a4"


export const fetchWeather = async (lat,lon)=>{
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`)
    
    return data
}

export const fetchCountry = async ()=>{
    const {data} = await axios.get("https://restcountries.com/v3.1/all")
    return data
}