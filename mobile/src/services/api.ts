import axios from "axios";
import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig.extra.baseURL;

export const api = axios.create({
  baseURL: BASE_URL,
});
