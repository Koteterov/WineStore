import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const logout = api.logout;


const endpoints = {
  catalog: "/data/wines",
  details: (id) => `/data/wines/${id}`,

};


export async function getList() {
  return await api.get(host + endpoints.catalog);
}


export async function getSingleWine(id) {
  return await api.get(host + endpoints.details(id));
}

// export async function search(query) {
//   return await api.get(host + endpoints.search(query));
// }


