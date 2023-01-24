import axios from "axios";
import {CURRENCY_TOKEN} from "./AppConfig";
import {API_URL} from "./constants";

export const getDollar = async () => {
    const response = await axios.get(`${API_URL}?apikey=${CURRENCY_TOKEN}&base_currency?=USD`);
    console.log(response.data.data.RUB.value);
    return response.data.data.RUB.value;

}

export const getLira = async () => {
    const response = await axios.get(`${API_URL}?apikey=${CURRENCY_TOKEN}&currencies=RUB&base_currency=TRY`);
    console.log(response.data.data.RUB.value);
    return response.data.data.RUB.value;

}

// export const getDollar2 = async () => {
//     const response = await axios({
//         method: 'get',
//         url: 'https://api.apilayer.com/exchangerates_data/live?base=USD&symbols=EUR,GBP',
//         headers: {
//             'apikey': CURRENCY_TOKEN2
//         }
//     });
//     console.log(response);
//     return response;
//
// }