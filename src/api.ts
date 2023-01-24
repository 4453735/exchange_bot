import axios from "axios";
import {CURRENCY_TOKEN} from "./AppConfig";
import {API_URL, CBR_URL} from "./constants";

export const getDollar = async () => {
    const response = await axios.get(`${API_URL}?apikey=${CURRENCY_TOKEN}&base_currency?=USD`);
    console.log(response.data.data.RUB.value);
    return response.data.data.RUB.value;

};

export const getLira = async () => {
    const response = await axios.get(`${API_URL}?apikey=${CURRENCY_TOKEN}&currencies=RUB&base_currency=TRY`);
    console.log(response.data.data.RUB.value);
    return response.data.data.RUB.value;

};

export const getDollar2 = async () => {
    const response = await axios.get(`${CBR_URL}`);
    console.log(response.data.Valute.USD.Value);
    return response.data.Valute.USD.Value;

};

export const getLira2 = async () => {
    const response = await axios.get(`${CBR_URL}`);
    //console.log(response.data.Valute.TRY.Value);
    return response.data.Valute.TRY.Value;

};