import { userApi } from "./api/user-api.js";
import { pubApi } from "./api/pub-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/{id}/admin", config: userApi.toggleAdmin },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/pubs", config: pubApi.find },
  { method: "POST", path: "/api/pubs", config: pubApi.create },
  { method: "GET", path: "/api/pubs/{id}", config: pubApi.findOne },
  { method: "DELETE", path: "/api/pubs", config: pubApi.deleteAll },
  { method: "DELETE", path: "/api/pubs/{id}", config: pubApi.deleteOne },
  { method: "POST", path: "/api/pubs/{id}", config: pubApi.update },
];
