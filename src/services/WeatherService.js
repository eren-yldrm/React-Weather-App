import axios from "axios";


class WeatherService {
    // Get a list of products
    getWeather = async (lat, lon) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=effde2391acd35e139e9a2df4cf810a4`).then((data) => data);
    };
}

export default WeatherService;