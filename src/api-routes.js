import { userApi } from "./api/user-api.js";
// import { placeApi } from "./api/place-api.js";
// import { commentApi } from "./api/comment-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

//   { method: "POST", path: "/api/places", config: placeApi.create },
//   { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
//   { method: "GET", path: "/api/places", config: placeApi.find },
//   { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
//   { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },

//   { method: "GET", path: "/api/comments", config: commentApi.find },
//   { method: "GET", path: "/api/comments/{id}", config: commentApi.findOne },
//   { method: "POST", path: "/api/places/{id}/comments", config: commentApi.create },
//   { method: "DELETE", path: "/api/comments", config: commentApi.deleteAll },
//   { method: "DELETE", path: "/api/comments/{id}", config: commentApi.deleteOne },
];
