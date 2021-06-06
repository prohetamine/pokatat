import axios      from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3333/api/v1/`,
    withCredentials: true,
    headers: {

    }
});

const API = {
    getAuthToken: async ({ login, password }) =>
      await instance.get(`getAuthToken?login=${login}&password=${password}`),
    checkAuth: async (token) =>
      await instance.get(`checkAuth?token=${token}`),
    getLocation: async ({ latitude, longitude, query }) => {
        if (latitude && longitude) {
          return await instance.get(`getLocation?latitude=${latitude}&longitude=${longitude}`)
        }
        if (query) {
          return await instance.get(`getLocation?query=${query}`)
        }
    },
    getUsers: async ({ contry, city, latitude, longitude, updTime, updIds, radius, count = 20 }) =>
      await instance.post(`getUsers`, {
        latitude,
        longitude,
        radius,
        count,
        updTime,
        updIds
      }),
    getFriends: async ({ contry, city, latitude, longitude, updTime, updIds, radius, count = 20 }) =>
      await instance.post(`getFriends`, {
        latitude,
        longitude,
        radius,
        count,
        updTime,
        updIds
      }),
    getSubscribes: async ({ contry, city, latitude, longitude, updTime, updIds, radius, count = 20 }) =>
      await instance.post(`getSubscribes`, {
        latitude,
        longitude,
        radius,
        count,
        updTime,
        updIds
      }),
    getNotify: async () =>
      await instance.get(`getNotify`)
};

export default API;
