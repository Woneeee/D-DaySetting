import axios from "axios";

const api = axios.create({
  baseURL: "https://test-api.spngone.com",
  headers: {
    Authorization: "da445ed8-4fa1-490e-87d4-3a992aa7d1a7",
  },
});

export const getDDay = (page = 1, count = 15) => {
  return api.get("/setting/d-day/comps", {
    params: { page, count },
  });
};

export const getAllDDay = (page = 1, count = 9999) => {
  return api.get("/setting/d-day/comps", {
    params: { page, count },
  });
};

// http://192.168.100.169:8400
