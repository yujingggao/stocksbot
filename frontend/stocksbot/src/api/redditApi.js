import axios from "axios"
import apiHelpers from "./apiHelpers"

const BASE_URL = "http://localhost:8000/stocksbot/reddit_api/"

// stuff to export
const RedditAPI = { }

RedditAPI.getAllRedditData = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(BASE_URL))
}



export default RedditAPI;