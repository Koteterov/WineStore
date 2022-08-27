import * as api from "./api.js";

// const host = "http://localhost:3030";
const host = "https://wines-store-api.herokuapp.com";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
  catalog: "/data/wines",
  details: (id) => `/data/wines/${id}`,
  types: (type) => `/data/wines?where=type%3D%22${type}%22`,
  order: "/data/cart",
  myorders: (userId) =>
    `/data/cart?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getList() {
  return await api.get(host + endpoints.catalog);
}

export async function getSingleWine(id) {
  return await api.get(host + endpoints.details(id));
}

export async function getWineType(type) {
  return await api.get(host + endpoints.types(type));
}

export async function orderWines(data) {
  return await api.post(host + endpoints.order, data);
}

export async function myOrders(userId) {
  return await api.get(host + endpoints.myorders(userId));
}
