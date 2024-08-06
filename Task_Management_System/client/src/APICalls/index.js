import axios from "axios";

function getToken() {
    const tms = localStorage.getItem("TMS");
    if (!tms) {
        return undefined;
    }
    return JSON.parse(tms).token || "";
}

export const axiosInstance = axios.create({
  headers: {
    withcredentials: "include",
    method: "POST",
    "Content-Type": "application/json",
    Authorization: `bearer ${getToken()}`,
  },
});

