import axios from "axios";

// Create a new product
class CountryService {
    // Get a list of products
    getCountries = async () => {
        return axios.get("https://restcountries.com/v3.1/all", {}).then((data) => data);
    };
}

export default CountryService;
