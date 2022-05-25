import axios from "axios"
import apiHelpers from "./apiHelpers"

const BASE_URL = "http://localhost:8000/stocksbot/finnhub_api/"

// stuff to export
const FinnHubAPI = { }

FinnHubAPI.postStockData = async (stock) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(BASE_URL, stock))
}



export default FinnHubAPI;