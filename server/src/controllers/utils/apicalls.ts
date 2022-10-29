import IPinfoWrapper, { LruCache, Options } from "node-ipinfo";
import * as dotenv from "dotenv";
dotenv.config();
import axios from 'axios';

const ACCESS_KEY_APILAYER: any = process.env.APILAYER;
const ACCESS_KEY_IPINFO: any = process.env.IPINFO;

const getGeolocalization = async (ip: string) => {
    try {
        const cacheOptions: Options<string, any> = {
            max: 5000,
            maxAge: 24 * 1000 * 60 * 60,
        };
        const cache = new LruCache(cacheOptions);
        const ipinfoWrapper = new IPinfoWrapper(ACCESS_KEY_IPINFO, cache);


        const response = await ipinfoWrapper.lookupIp(ip)

        const currency = await getCurrency(response.countryCode);


        const currencyToPass = Object.keys(currency[0].currencies)

        const changeCurrency = await getChangeCurrency(currencyToPass);

        return {
            ip,
            country_name: response.country,
            country_code: response.countryCode,
            currency: currencyToPass,
            changeCurrency: changeCurrency

        }

    } catch (error) {
        return error;
    }
}

const getCurrency = async (countryCode: string) => {

    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);

        return response.data;
    } catch (error) {
        return error;
    }
}

const getChangeCurrency = async (currency: any) => {
    try {
        const changeCurrencyUsd = await axios.get(`https://api.apilayer.com/fixer/convert?to=USD&from=${currency}&amount=1&apikey=${ACCESS_KEY_APILAYER}`,);

        const changeCurrencyEur = await axios.get(`https://api.apilayer.com/fixer/convert?to=EUR&from=${currency}&amount=1&apikey=${ACCESS_KEY_APILAYER}`,);



        return {
            usd: changeCurrencyUsd.data.result,
            eur: changeCurrencyEur.data.result
        }

        // return {
        //     "usd": 0.000207,
        //     "eur": 0.000208
        // }
    } catch (error) {
        return error;
    }
}

export {
    getGeolocalization
}